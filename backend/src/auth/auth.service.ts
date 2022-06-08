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
      throw new BadRequestException();
    }
  }
  private async checkFacebookCode(code: string) {
    try {
      const request = await this.facebookService.getToken(code);
      const token = request.data.access_token;
      const extractUserData = await this.facebookService.getUserData(token);
      return extractUserData.data;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  private async upsertUserToDb(user: TokenPayload | UserDataFB) {
    const findUserInDb = await this.prismaService.user.findFirst({
      where: {
        authProvider: { providerKey: 'id' in user ? user.id : user.sub },
      },
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
  async loginWithGoogle(code: string) {
    const token = await this.checkGoogleCode(code);
    const user = await this.upsertUserToDb(token);
    const accessToken = await this.createToken(user.id);
    if (typeof accessToken === 'string') return accessToken;
    else throw new BadRequestException();
  }
  async loginWithFacebook(code: string) {
    const token = await this.checkFacebookCode(code);
    const user = await this.upsertUserToDb(token);
    const accessToken = await this.createToken(user.id);
    if (typeof accessToken === 'string') return accessToken;
    else throw new BadRequestException();
  }

  async login(login: LoginDto) {
    const { username, password } = login;
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
}
