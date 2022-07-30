import { IsInt, IsNumber } from 'class-validator';

export class UpdateOfferedServiceDto {
  @IsNumber()
  price?: number;
  @IsInt()
  duration?: number;

  offeredServiceId: string;
  userId: string;
}
