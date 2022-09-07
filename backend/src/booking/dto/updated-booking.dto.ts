import { BookingStatus } from '@prisma/client';
import { IsOptional } from 'class-validator';

export class UpdatedBookingDto {
  @IsOptional()
  status: BookingStatus;
  @IsOptional()
  isFinishedConfirmed: boolean;
}
