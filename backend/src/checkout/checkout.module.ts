import { Module } from '@nestjs/common';
import { SendGridModule } from 'src/sendgrid/sengrid.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [StripeModule, SendGridModule],
})
export class CheckoutModule {}
