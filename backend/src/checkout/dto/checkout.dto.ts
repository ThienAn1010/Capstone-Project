import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  id: string;
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
  @IsNumber()
  amount: number;
}
