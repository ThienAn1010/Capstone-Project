import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { BookingService } from './booking.service';
import { UpdatedBookingDto } from './dto/updated-booking.dto';

@Controller('/bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}
  @Get('')
  async getAllbookings() {
    return this.bookingService.getAllBookings();
  }

  @Get('/:bookingId')
  async getDetailBooking(@Param('bookingId') bookingId: string) {
    return this.bookingService.getBooking(bookingId);
  }

  @Patch('/:bookingId')
  async updateBooking(
    @Param('bookingId') bookingId: string,
    @Body() updatedBookingDto: UpdatedBookingDto,
  ) {
    return this.bookingService.updateBooking(bookingId, updatedBookingDto);
  }
}
