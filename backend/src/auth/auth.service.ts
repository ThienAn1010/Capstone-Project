import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { GoogleService } from 'src/google/google.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { FacebookService, UserDataFB } from 'src/facebook/facebook.service';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { SocialLoginDto } from './dto/social-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleService: GoogleService,
    private readonly facebookService: FacebookService,
    private readonly configService: ConfigService,
  ) {}
  private async checkGoogleCode(code: string) {
    try {
      const token = await this.googleService.getToken(code);
      const userData = await this.googleService.getUserData(
        token.tokens.id_token,
      );
      const user = userData.getPayload();
      return user;
    } catch (error) {
      throw new BadRequestException({
        status: 'fail',
        message: 'Invalid code',
      });
    }
  }
  private async checkFacebookCode(code: string) {
    try {
      const request = await this.facebookService.getToken(code);
      const token = request.data.access_token;
      const extractUserData = await this.facebookService.getUserData(token);
      return extractUserData.data;
    } catch (error) {
      throw new BadRequestException({
        status: 'fail',
        message: 'Invalid code',
      });
    }
  }
  private async upsertUserToDb(user: TokenPayload | UserDataFB) {
    const select = {
      id: true,
      name: true,
      role: true,
      username: true,
      picture: true,
    };
    const findUserInDb = await this.prismaService.user.findFirst({
      where: {
        authProvider: { providerKey: 'id' in user ? user.id : user.sub },
      },
      select,
    });
    if (findUserInDb) return findUserInDb;
    const savedUserInDb = await this.prismaService.user.create({
      data: {
        username: user.email,
        name: user.name,
        picture: 'id' in user ? user.picture.data.url : user.picture,
        authProvider: {
          create: {
            providerKey: 'id' in user ? user.id : user.sub,
          },
        },
      },
      select,
    });
    return savedUserInDb;
  }
  private async createToken(id: string) {
    return new Promise((res, rej) => {
      jwt.sign(
        { userId: id },
        this.configService.get('JWT_SECRET'),
        {
          expiresIn: '1d',
        },
        (err, decoded) => {
          if (err) rej(err);
          res(decoded);
        },
      );
    });
  }

  private loginWithSocialMedia = async ({ code, type }: SocialLoginDto) => {
    const token =
      type === 'google'
        ? await this.checkGoogleCode(code)
        : await this.checkFacebookCode(code);
    const user = await this.upsertUserToDb(token);
    const accessToken = await this.createToken(user.id);
    if (typeof accessToken === 'string') return { accessToken, user };
    else throw new BadRequestException();
  };

  async socialLogin(socialLoginDto: SocialLoginDto) {
    const data = await this.loginWithSocialMedia(socialLoginDto);
    return data;
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) throw new NotFoundException();
    const isCorrect = await bcrypt.compare(password, user.password);
    if (isCorrect) {
      const accessToken = await this.createToken(user.id);
      return accessToken;
    }
    throw new BadRequestException();
  }

  async register(registerDto: RegisterDto) {
    const { address, password, phoneNumber, username, name, picture } =
      registerDto;
    const user = await this.prismaService.user.findFirst({
      where: {
        username,
      },
    });
    if (user) {
      throw new BadRequestException({
        status: 'fail',
        message: 'Email already in used',
      });
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const createdUser = await this.prismaService.user.create({
      data: {
        name,
        picture,
        username,
        password: hashedPassword,
        phoneNumber,
        role: 'paperMaker',
        paperMaker: {
          create: {
            address,
            lat: 123,
            long: 123,
          },
        },
      },
    });
    const accessToken = await this.createToken(createdUser.id);
    return accessToken;
  }
}
