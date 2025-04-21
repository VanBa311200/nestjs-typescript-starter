import { IsNotEmpty, IsString } from 'class-validator';
import UserEntity from 'src/Entities/user.entity';

export default class CreateDto {
  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  author: UserEntity;
}
