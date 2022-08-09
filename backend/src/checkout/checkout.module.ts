import { Module } from '@nestjs/common';
import { StripeModule } from 'src/stripe/stripe.module';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [StripeModule],
})
export class CheckoutModule {}
