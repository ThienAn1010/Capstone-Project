import { IsString, IsNumber, IsNotEmpty, IsInt } from 'class-validator';

export class CreateServiceDto {
  @IsNumber()
  @IsNotEmpty()
  price: number;
  @IsInt()
  @IsNotEmpty()
  duration: number;
  @IsString()
  @IsNotEmpty()
  serviceId: string;

  userId: string;
}
