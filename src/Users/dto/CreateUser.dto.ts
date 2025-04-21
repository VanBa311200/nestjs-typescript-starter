import { IsEmail, IsString, IsNotEmpty, MinLength } from 'class-validator';

export default class CreateUserDto {
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
