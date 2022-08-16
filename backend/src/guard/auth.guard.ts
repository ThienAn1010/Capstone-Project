import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  private verifyToken(token: string) {
    return new Promise((res, rej) => {
      jwt.verify(
        token,
        this.configService.get('JWT_SECRET'),
        (error, decoded) => {
          if (error) rej(error);
          const userId = (decoded as jwt.JwtPayload).userId as string;
          res(userId);
        },
      );
    });
  }

  private async findUser(id: string) {
    try {
      const user = await this.prismaService.user.findFirst({
        where: { id: id },
        select: {
          id: true,
          name: true,
          role: true,
          username: true,
          picture: true,
          address: true,
          phoneNumber: true,
        },
      });
      if (!user) {
        throw new Error();
      }
      return user;
    } catch (error) {
      throw new Error();
    }
  }

  async getMe(token: string) {
    try {
      const userId = await this.verifyToken(token);
      if (typeof userId === 'string') {
        const user = await this.findUser(userId);
        return user;
      } else throw new Error();
    } catch (error) {
      throw error;
    }
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const accessToken = (request as Request).cookies?.accessToken;
    if (!accessToken) return false;
    try {
      const user = await this.getMe(accessToken);
      request.user = user;
      return true;
    } catch (error) {
      return false;
    }
  }
}
