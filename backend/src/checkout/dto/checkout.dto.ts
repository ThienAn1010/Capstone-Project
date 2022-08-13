import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class Location {
  @IsNotEmpty()
  lat: number;
  @IsNotEmpty()
  lng: number;
}

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
  note?: string;
  @IsNotEmpty()
  location: Location;
}
