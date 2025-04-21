import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { EntityId } from 'typeorm/repository/EntityId';

import { AbstractServiceCRUD } from './abstractServiceCRUD';

export default class PostgresGenericService<Entity extends ObjectLiteral>
  implements AbstractServiceCRUD<Entity>
{
  constructor(public _repository: Repository<Entity>) {}

  async getAll() {
    return this._repository.find({ relations: ['posts'] });
  }

  async getById(id: EntityId) {
    const data = await this._repository.findOneById(id);
    if (data) return data;
    throw new NotFoundException();
  }

  async create(category: Entity) {
    const categoryE = this._repository.create(category);
    const data = await this._repository.save(categoryE);

    if (data) return data;
    throw new NotFoundException();
  }

  async update(id: EntityId, category: Entity) {
    await this._repository.update(id, category);
    const data = await this.getById(id);
    if (data) return data;
    throw new NotFoundException();
  }
}
