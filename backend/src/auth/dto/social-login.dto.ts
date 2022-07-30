import { IsString, IsNotEmpty } from 'class-validator';

export class SocialLoginDto {
  @IsString()
  @IsNotEmpty()
  code: string;
  @IsString()
  @IsNotEmpty()
  type: 'facebook' | 'google';
}
