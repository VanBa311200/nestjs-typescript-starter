import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export default class UpdateDto {
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  title: string;
}
