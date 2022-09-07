import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatedBookingDto } from './dto/updated-booking.dto';

const select = {
  id: true,
  note: true,
  user: true,
  status: true,
  payAmount: true,
  createdAt: true,
  acceptedAt: true,
  droppedAt: true,
  finishedAt: true,
  isFinishedConfirmed: true,
  isDroppedConfirmed: true,
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
};

@Injectable()
export class BookingService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllBookings() {
    const bookings = await this.prismaService.booking.findMany({
      select,
    });
    return { status: 'success', length: bookings.length, bookings: bookings };
  }

  async getBooking(bookingId: string) {
    const booking = await this.prismaService.booking.findUnique({
      where: { id: bookingId },
      select,
    });
    if (!booking) {
      throw new NotFoundException({
        status: 'fail',
        message: 'No booking found with a given id',
      });
    }
    return { status: 'success', booking: booking };
  }

  async updateBooking(bookingId: string, updatedBookingDto: UpdatedBookingDto) {
    const booking = await this.prismaService.booking.update({
      where: {
        id: bookingId,
      },
      data: {
        ...(updatedBookingDto.status && { status: updatedBookingDto.status }),
        ...(updatedBookingDto.status === 'accept' && {
          acceptedAt: new Date(),
        }),
        ...(updatedBookingDto.status === 'drop' && {
          droppedAt: new Date(),
        }),
        ...(updatedBookingDto.status === 'success' && {
          finishedAt: new Date(),
        }),
        ...(updatedBookingDto.isFinishedConfirmed && {
          isFinishedConfirmed: updatedBookingDto.isFinishedConfirmed,
        }),
      },
      select,
    });
    if (!booking) {
      throw new NotFoundException({
        status: 'fail',
        message: 'No booking found with a given id',
      });
    }
    return { status: 'success', booking: booking };
  }
}
