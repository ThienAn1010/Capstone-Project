import {
  IsString,
  IsNotEmpty,
  IsPhoneNumber,
  MinLength,
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
  picture?: string;
}
