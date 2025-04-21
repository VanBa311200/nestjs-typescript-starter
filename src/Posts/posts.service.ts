import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import CreateDto from './dto/createPost.dto';
import UpdateDto from './dto/updatePost.dto';
import PostEntity from '../Entities/post.entity';
import UserEntity from '../Entities/user.entity';

@Injectable()
export default class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
  ) {}

  getAllPosts() {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (post) {
      return post;
    }

    throw new HttpException('Not found post', HttpStatus.NOT_FOUND);
  }

  async updatePost(id: number, post: UpdateDto) {
    await this.postsRepository.update(id, post);
    await this.getPostById(id);
  }

  async createPost(post: CreateDto, user: UserEntity) {
    const newPost = this.postsRepository.create({ ...post, author: user });
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
