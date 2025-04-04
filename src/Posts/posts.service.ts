import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateDto from './dto/createPost.dto';
import UpdateDto from './dto/updatePost.dto';
import PostEntity from '..//Entities/post.entity';

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOneBy({ id });
    if (post) {
      return post;
    }

    throw new HttpException('Not found post', HttpStatus.NOT_FOUND);
  }

  async replacePost(id: number, post: UpdateDto) {
    const replacedRes = await this.postsRepository.update(id, post);
    if (!replacedRes.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }

  async createPost(post: CreateDto) {
    const newPost = this.postsRepository.create(post);
    await this.postsRepository.save(newPost);
    return newPost;
  }

  async deletePost(id: number) {
    const deleteRes = await this.postsRepository.delete(id);
    if (!deleteRes.affected) {
      throw new HttpException('Post not found', HttpStatus.NOT_FOUND);
    }
  }
}
