import { Optional } from '@nestjs/common';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateAppointmentDTO {
  @Optional()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  status: string;

  @Optional()
  @IsArray()
  todos: string[];
}
