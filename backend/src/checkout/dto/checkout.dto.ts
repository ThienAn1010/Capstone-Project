import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  address: string;
  @IsNotEmpty()
  @IsString()
  phone: string;
  @IsString()
  @IsOptional()
  note?: string;
  @IsNumber()
  @IsOptional()
  lat?: number;
  @IsNumber()
  @IsOptional()
  lng?: number;
}
