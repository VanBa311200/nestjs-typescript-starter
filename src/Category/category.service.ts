import { Injectable } from '@nestjs/common';

import CategoryEntity from 'src/Entities/category.entity';
import PostgresGenericService from 'src/Common/postgresGenericService';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService extends PostgresGenericService<CategoryEntity> {
  constructor(_repository: CategoryRepository) {
    super(_repository);
  }
}
