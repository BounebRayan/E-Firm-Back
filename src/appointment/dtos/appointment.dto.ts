import { Optional } from '@nestjs/common';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class AppointmentDto {
  @IsNotEmpty()
  @IsEmail()
  lawyerEmail: string;

  @IsNotEmpty()
  @IsEmail()
  clientEmail: string;

  @Optional()
  date: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @Optional()
  todos: string[];
}
