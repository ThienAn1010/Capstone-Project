import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { StripeService } from 'src/stripe/stripe.service';
import { CheckoutDto } from './dto/checkout.dto';
@Injectable()
export class CheckoutService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
    private readonly stripeService: StripeService,
  ) {}
  async createStripeLink(user: any, checkoutDto: CheckoutDto) {
    const { amount, description, id, name, address, phone, note, lat, lng } =
      checkoutDto;
    await this.prismaService.user.update({
      where: { id: user.id },
      data: {
        address,
        lat,
        long: lng,
      },
    });
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
        const [userId, offeredServiceId] = (
          sessionInfo.client_reference_id as string
        ).split('||');
        const payAmount = sessionInfo.amount_total / 100;
        const data = await this.prismaService.booking.create({
          data: {
            userId,
            offeredServiceId,
            payAmount,
            note: 'ABC',
          },
        });
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
