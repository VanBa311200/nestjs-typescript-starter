import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import CategoryController from './category.controller';
import { CategoryService } from './category.service';
import CategoryEntity from 'src/Entities/category.entity';
import { CategoryRepository } from './category.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CategoryEntity])],
  providers: [CategoryService, CategoryRepository],
  controllers: [CategoryController],
})
export class CategoryModule {
  constructor() {}
}
