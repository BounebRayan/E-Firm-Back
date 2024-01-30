import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, Min } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  FamilyName: string;
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;
  @IsNotEmpty()
  phoneNumber: string;
  @IsNotEmpty()
  @Min(21)
  age: number;
  @IsNotEmpty()
  city: string;
  @Optional()
  bio: string;
  @Optional()
  rating: number;
  @IsNotEmpty()
  speciality: string;
}
