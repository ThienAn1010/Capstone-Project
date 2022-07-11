import { IsString, IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class CreateOfferedServiceDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsInt()
  @IsNotEmpty()
  duration: number;
  @IsString()
  @IsNotEmpty()
  serviceId: string;
  @IsString()
  @IsNotEmpty()
  description: string;
  userId: string;
}
