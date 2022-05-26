import { BadRequestException, Injectable } from '@nestjs/common';
import { TokenPayload } from 'google-auth-library';
import { GoogleService } from 'src/google/google.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly googleService: GoogleService,
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
  private async upsertUserToDb(user: TokenPayload) {
    const findUserInDb = await this.prismaService.user.findFirst({
      where: { username: { equals: user.email } },
    });
    if (findUserInDb) return findUserInDb;
    const savedUserInDb = await this.prismaService.user.create({
      data: {
        username: user.email,
        name: user.name,
        role: 'paperRequester',
        picture: user.picture,
        authProvider: {
          create: {
            providerKey: user.sub,
          },
        },
        paperRequester: {
          create: {},
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

  async logout() {}
}
