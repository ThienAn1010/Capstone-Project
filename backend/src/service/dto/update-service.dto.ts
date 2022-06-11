import { IsInt, IsNumber } from 'class-validator';

export class UpdateServiceDto {
  @IsNumber()
  price?: number;
  @IsInt()
  duration?: number;

  offeredServiceId: string;
  userId: string;
}
