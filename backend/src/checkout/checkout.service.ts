import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { SendGridService } from 'src/sendgrid/sendgrid.service';
import { StripeService } from 'src/stripe/stripe.service';
import { CheckoutDto } from './dto/checkout.dto';
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
          success_url: `${this.configService.get('CLIENT_URL')}/?success=true`,
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
        const [userId, offeredServiceId, address, note] = (
          sessionInfo.client_reference_id as string
        ).split('||');
        const payAmount = sessionInfo.amount_total / 100;
        const data = await this.prismaService.booking.create({
          data: {
            userId,
            offeredServiceId,
            payAmount,
            note: note ?? '',
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
          <p>You have a new booking for your service ${data.offeredService.service.name}.</p>
          <p>Your client booked at. </p>
          <p>If you have any problem. Please don't hesitate to contact us</p>
          <p>Thank you for using our service.</p>
          `,
        };
        await this.sendGridService.getSendGrid().send(sendToUser);
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
}
