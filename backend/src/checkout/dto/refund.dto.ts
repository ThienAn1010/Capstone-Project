import { IsNotEmpty, IsString } from 'class-validator';

export class RefundDto {
  @IsNotEmpty()
  @IsString()
  paymentIntentId: string;
  @IsNotEmpty()
  amount: number;
}
