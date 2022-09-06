import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateOfferedServiceDto {
  @IsNumber()
  @IsOptional()
  price: number;
  @IsInt()
  @IsOptional()
  duration: number;
  @IsString()
  @IsOptional()
  serviceId: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  documents: string;
  @IsString()
  @IsOptional()
  estimate: string;
  offeredServiceId: string;
  userId: string;
  @IsString()
  @IsOptional()
  thumbnail?: string;
}
