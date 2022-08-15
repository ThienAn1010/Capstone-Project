import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBookings() {
    const bookings = await this.prismaService.booking.findMany({
      select: {
        id: true,
        note: true,
        user: true,
        status: true,
        payAmount: true,
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
    return { status: 'success', length: bookings.length, bookings: bookings };
  }
}
