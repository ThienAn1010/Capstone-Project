import { BadRequestException, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}
  private async verifyToken(token: string) {
    if (!token) throw new BadRequestException();
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
        },
      });
      return user;
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async getMe(token: string) {
    const userId = await this.verifyToken(token);
    if (typeof userId !== 'string') throw new BadRequestException();
    const user = await this.findUser(userId);
    return user;
  }
}
