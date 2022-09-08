import { Module } from '@nestjs/common';
import { SendGridModule } from 'src/sendgrid/sengrid.module';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';

@Module({
  controllers: [BookingController],
  providers: [BookingService],
  imports: [SendGridModule],
})
export class BookingModule {}
