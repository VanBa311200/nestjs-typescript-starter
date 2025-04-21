import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export default class RegisterDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @MinLength(7)
  password: string;
}
