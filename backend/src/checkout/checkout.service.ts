import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { StripeService } from 'src/stripe/stripe.service';
import { CheckoutDto } from './dto/checkout.dto';
import * as dayjs from 'dayjs';
import { RefundDto } from './dto/refund.dto';
@Injectable()
export class CheckoutService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
    private readonly sendGridService: SendGridService,
  ) {}
  async createStripeLink(user: any, checkoutDto: CheckoutDto) {
    const { amount, description, id, name, address, phone, note, lat, lng } =
      checkoutDto;
    const userSavedInDB = await this.prismaService.user.findUnique({
      where: { id: user.id },
    });
    const updatedData = {} as any;
    if (!userSavedInDB.address) {
      updatedData.address = address;
      updatedData.lat = lat;
      updatedData.long = lng;
    }
    if (!userSavedInDB.phoneNumber) {
      updatedData.phoneNumber = phone;
    }
    if (Object.keys(updatedData).length > 0) {
      await this.prismaService.user.update({
        where: { id: user.id },
        data: {
          address,
          lat,
          long: lng,
          phoneNumber: phone,
        },
      });
    }
    try {
      const session = await this.stripeService
        .getStripe()
        .checkout.sessions.create({
          client_reference_id: `${user.id}||${id}||${address}||${phone}||${note}`,
          customer_email: user.username,
          line_items: [
            {
              quantity: 1,
              price_data: {
                currency: 'USD',
                unit_amount: amount * 100,
                product_data: {
                  name,
                  description,
                },
              },
            },
          ],
          mode: 'payment',
          success_url: `${this.configService.get(
            'CLIENT_URL',
          )}/checkout/success`,
          cancel_url: `${this.configService.get('CLIENT_URL')}/?canceled=true`,
        });
      return { status: 'success', session: session.url };
    } catch (error) {
      throw new BadRequestException();
    }
  }
  async handleSuccessfulPayment(req: Request) {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = this.configService.get('STRIPE_WEBHOOK_SECRET');
    try {
      const event = this.stripeService
        .getStripe()
        .webhooks.constructEvent(req.body, sig, endpointSecret);
      if (event.type === 'checkout.session.completed') {
        const sessionInfo = event.data.object as any;
        console.log(sessionInfo);
        const [userId, offeredServiceId, address, phone, note] = (
          sessionInfo.client_reference_id as string
        ).split('||');
        const payAmount = sessionInfo.amount_total / 100;
        const data = await this.prismaService.booking.create({
          data: {
            userId,
            offeredServiceId,
            payAmount,
            note: note ?? '',
            paymentIntentId: sessionInfo.payment_intent,
          },
          include: {
            user: true,
            offeredService: {
              include: {
                service: true,
                paperMaker: {
                  include: {
                    user: true,
                  },
                },
              },
            },
          },
        });
        const sendToUser = {
          to: sessionInfo.customer_details.email, // Change to your recipient
          from: {
            email: this.configService.get('SENDGRID_VERIFIED_SENDER'),
            name: 'Paperwork',
          }, // Change to your verified sender
          subject: 'Successfully booked a service',
          html: `
          <p>Dear ${data.user.name}</h1>
          <p>You have successfully booked a service in our system.</p>
          <p>The service (${data.offeredService.service.name}) provided by (${data.offeredService.paperMaker.user.name}) will contact you within 24 hours to proceed, or you can contact him/her directly with this phone number ${data.offeredService.paperMaker.user.phoneNumber}. </p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        const sendToPapermaker = {
          to: data.offeredService.paperMaker.user.username, // Change to your recipient
          from: this.configService.get('SENDGRID_VERIFIED_SENDER'), // Change to your verified sender
          subject: 'You have a new booking',
          html: `
          <p>Dear ${data.offeredService.paperMaker.user.name}</h1>
          <p>You have a new booking for your service ${
            data.offeredService.service.name
          }.</p>
          <p>Your client booked at ${dayjs(data.createdAt).format(
            'HH:mm',
          )} on ${dayjs(data.createdAt).format(
            'DD-MM-YYYY',
          )}. Please call this number ${
            data.user.phoneNumber
          } within 24 hours, or on the ready to receive call from your client. If you accept, please go to your dashboard and accept this request.
          </p>
          <p>Note: This is the address of your client: ${data.user.address}</p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        await this.sendGridService.getSendGrid().send(sendToUser);
        await this.sendGridService.getSendGrid().send(sendToPapermaker);
        return { status: 'success', data };
      }
    } catch (error) {
      throw new BadRequestException({
        status: 'error',
        message: 'Something went wrong',
        error,
      });
    }
  }

  async handleRefund(refundDto: RefundDto) {
    const session = await this.stripeService.getStripe();
    try {
      const refund = await session.refunds.create({
        amount: refundDto.amount,
        payment_intent: refundDto.paymentIntentId,
      });
      console.log(refund);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
    return { status: 200, message: 'Successfully Refund' };
  }
}
