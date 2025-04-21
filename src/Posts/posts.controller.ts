import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import PostService from './posts.service';
import CreatePostDto from './dto/createPost.dto';
import UpdatePostDto from './dto/updatePost.dto';
import JwtAuthGuard from '../Auth/jwtAuth.guard';
import { RequestWithUser } from 'src/Auth/auth.interface';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts() {
    return this.postService.getAllPosts();
  }

  @Get(':id')
  getPostById(@Param('id') id: number) {
    return this.postService.getPostById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  createPost(@Body() post: CreatePostDto, @Req() req: RequestWithUser) {
    return this.postService.createPost(post, req.user);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updatePost(@Param('id') id: string, @Body() post: UpdatePostDto) {
    return this.postService.updatePost(Number(id), post);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deletePost(@Param('id') id: string) {
    return this.postService.deletePost(Number(id));
  }
}
