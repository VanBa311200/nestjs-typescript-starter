import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import CategoryEntity from 'src/Entities/category.entity';

export class CategoryRepository extends Repository<CategoryEntity> {
  constructor(
    @InjectRepository(CategoryEntity)
    readonly _repository: Repository<CategoryEntity>,
  ) {
    super(_repository.target, _repository.manager, _repository.queryRunner);
  }
}
