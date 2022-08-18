import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
  IsOptional,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
  @IsString()
  @IsNotEmpty()
  address: string;
  @IsString()
  @IsPhoneNumber('VN')
  phoneNumber: string;
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsOptional()
  picture?: string;
  @IsNotEmpty()
  lat: number;
  @IsNotEmpty()
  lng: number;
}
