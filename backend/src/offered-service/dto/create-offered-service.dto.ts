import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsInt,
  IsOptional,
} from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  documents: string;
  @IsString()
  @IsNotEmpty()
  estimate: string;
  userId: string;
  @IsString()
  @IsOptional()
  thumbnail: string;
}
