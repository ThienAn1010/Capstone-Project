import { Controller, Get } from '@nestjs/common';
import { User } from 'src/decorator/user.decorator';
import { AuthGuard } from 'src/guard/auth.guard';
import { RoleGuard } from 'src/guard/role.guard';
import { BookingService } from './booking.service';

@Controller('/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Get('')
  async getAllbookings() {
    return this.bookingService.getAllBookings();
  }
}
