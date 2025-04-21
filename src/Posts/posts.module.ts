import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostController } from './posts.controller';
import PostService from './posts.service';

import Post from '../Entities/post.entity';
import User from '../Entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService],
})
export default class PostModule {}
