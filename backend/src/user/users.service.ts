import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserUpdateDto } from './dto/user-update-service.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}
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
          address: true,
          phoneNumber: true,
        },
      });
      if (!user) {
        throw new NotFoundException();
      }
      return user;
    } catch (error) {
      if (error instanceof NotFoundException) return;
      throw new BadRequestException();
    }
  }
  async getMe(token: string) {
    const userId = await this.verifyToken(token);
    if (typeof userId !== 'string') throw new BadRequestException();
    const user = await this.findUser(userId);
    return user;
  }

  async getAllMyBookings(user: any) {
    const bookings = await this.prismaService.booking.findMany({
      where: {
        ...(user.role === 'user' && { userId: user.id }),
        ...(user.role === 'paperMaker' && {
          offeredService: { paperMaker: { userId: user.id } },
        }),
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        note: true,
        status: true,
        payAmount: true,
        createdAt: true,
        acceptedAt: true,
        droppedAt: true,
        finishedAt: true,
        isFinishedConfirmed: true,
        isDroppedConfirmed: true,
        user: {
          select: {
            id: true,
            username: true,
            name: true,
            address: true,
            lat: true,
            long: true,
            picture: true,
            phoneNumber: true,
            createdAt: true,
            role: true,
          },
        },
        offeredService: {
          include: {
            paperMaker: {
              include: {
                user: {
                  select: {
                    id: true,
                    username: true,
                    name: true,
                    address: true,
                    lat: true,
                    long: true,
                    picture: true,
                    phoneNumber: true,
                    createdAt: true,
                    role: true,
                  },
                },
              },
            },
            service: true,
          },
        },
      },
    });
    return { status: 'success', length: bookings.length, bookings };
  }

  async updateMe(userId: string, userUpdateDto: UserUpdateDto) {
    const updatedMe = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: userUpdateDto,
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
    const accessToken = await this.createToken(updatedMe.id);
    return { accessToken, user: updatedMe };
  }

  async getMyOfferedServices(id: string) {
    const myOfferedService = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        paperMaker: {
          include: {
            offeredServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
    if (!myOfferedService)
      return new NotFoundException({
        status: 'fail',
        message: 'This papermaker has not registered offered service',
      });
    return { status: 'success', data: myOfferedService };
  }

  async getMyBooked(id: string) {
    const myOfferedService = await this.prismaService.user.findFirst({
      where: {
        id,
      },
      select: {
        paperMaker: {
          include: {
            offeredServices: {
              include: {
                service: true,
              },
            },
          },
        },
      },
    });
    if (!myOfferedService)
      return new NotFoundException({
        status: 'fail',
        message: 'This papermaker has not registered offered service',
      });
    return { status: 'success', data: myOfferedService };
  }
}
