import { BookingStatus } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class UpdatedBookingDto {
  @IsNotEmpty()
  status: BookingStatus;
}
