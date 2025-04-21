import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';

import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/createCategory.dto';
import UpdateCategoryDto from './dto/updateCategory.dto';

@Controller('category')
export default class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  getAll() {
    console.log('');
    return this.categoryService.getAll();
  }

  @Get(':id')
  getById(@Param('id') id: number) {
    return this.categoryService.getById(id);
  }

  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put()
  update(@Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(updateCategoryDto.id, updateCategoryDto);
  }
}
