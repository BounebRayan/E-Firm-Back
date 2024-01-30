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
  @Min(18)
  age: number;
  @IsNotEmpty()
  city: string;
}
