import {
  BadRequestException,
  Body,
  Controller,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { StripeService } from 'src/stripe/stripe.service';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('/checkout')
export class CheckoutController {
  constructor(
    private readonly checkoutService: CheckoutService,
    private readonly stripeService: StripeService,
  ) {}
  @Post('/')
  @UseGuards(AuthGuard)
  async getCheckoutLink(@User() user, @Body() checkoutDto: CheckoutDto) {
    return this.checkoutService.createStripeLink(user, checkoutDto);
  }

  @Post('/webhook')
  async handleSuccessfulPayment(@Request() req) {
    return this.checkoutService.handleSuccessfulPayment(req);
  }
}
