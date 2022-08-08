import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('/checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}
  @Post('/')
  @UseGuards(AuthGuard)
  async getCheckoutLink(@User() user, @Body() checkoutDto: CheckoutDto) {
    const session = await this.checkoutService.createStripeLink(
      user,
      checkoutDto,
    );
    return { status: 'success', session: session.url };
  }
}
