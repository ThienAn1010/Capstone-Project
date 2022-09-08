import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
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
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sendGridService: SendGridService,
    private readonly configService: ConfigService,
  ) {}

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

    if (!updatedBookingDto.isFinishedConfirmed) {
      if (booking.status === 'accept') {
        const sendToUser = {
          to: booking.user.username, // Change to your recipient
          from: {
            email: this.configService.get('SENDGRID_VERIFIED_SENDER'),
            name: 'Paperwork',
          }, // Change to your verified sender
          subject: `Your booking has been accepted`,
          html: `
          <p>Dear ${booking.user.name}</h1>
          <p>Your boooking has been accepted by ${
            booking.offeredService.paperMaker.user.name
          }. You can keep track of the progress in the dashboard. The paperwork is expected to take <strong>${
            booking.offeredService.duration
          }</strong> days, and will finish in <strong>${dayjs(
            booking.acceptedAt,
          )
            .add(booking.offeredService.duration, 'd')
            .format('DD-MM-YYYY')}</strong></p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        await this.sendGridService.getSendGrid().send(sendToUser);
      }

      if (booking.status === 'deny') {
        const sendToUser = {
          to: booking.user.username, // Change to your recipient
          from: {
            email: this.configService.get('SENDGRID_VERIFIED_SENDER'),
            name: 'Paperwork',
          }, // Change to your verified sender
          subject: `Your booking has been denied`,
          html: `
          <p>Dear ${booking.user.name}</h1>
          <p>Your boooking has been denied by ${booking.offeredService.paperMaker.user.name}. Your money has been refunded accordingly</p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        await this.sendGridService.getSendGrid().send(sendToUser);
      }

      if (booking.status === 'drop') {
        const sendToUser = {
          to: booking.user.username, // Change to your recipient
          from: {
            email: this.configService.get('SENDGRID_VERIFIED_SENDER'),
            name: 'Paperwork',
          }, // Change to your verified sender
          subject: `You have dropped your booking`,
          html: `
          <p>Dear ${booking.user.name}</h1>
          <p>You have dropped our service, and we will contact you to learn more about your service before refundeding</p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        const sendToPapermaker = {
          to: booking.offeredService.paperMaker.user.username, // Change to your recipient
          from: {
            email: this.configService.get('SENDGRID_VERIFIED_SENDER'),
            name: 'Paperwork',
          }, // Change to your verified sender
          subject: `The customer has dropped your booking`,
          html: `
          <p>Dear ${booking.offeredService.paperMaker.user.username}</h1>
          <p>The customer has dropped your booing, and we will contact you to learn more about the booking</p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        await this.sendGridService.getSendGrid().send(sendToUser);
        await this.sendGridService.getSendGrid().send(sendToPapermaker);
      }

      if (booking.status === 'success') {
        const sendToUser = {
          to: booking.user.username, // Change to your recipient
          from: {
            email: this.configService.get('SENDGRID_VERIFIED_SENDER'),
            name: 'Paperwork',
          }, // Change to your verified sender
          subject: `Your booking has been completed`,
          html: `
          <p>Dear ${booking.user.name}</h1>
          <p>Your boooking has been completed. Please confirm it in your dashboard to finish the process.</p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        await this.sendGridService.getSendGrid().send(sendToUser);
      }
    }

    return { status: 'success', booking: booking };
  }
}
