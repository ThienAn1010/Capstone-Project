import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
    const { amount, description, id, name } = checkoutDto;
    const session = await this.stripeService
      .getStripe()
      .checkout.sessions.create({
        client_reference_id: `${user.id}|${id}`,
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
    return session;
  }
}
