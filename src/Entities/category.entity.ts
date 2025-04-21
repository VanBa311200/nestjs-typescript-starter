import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import PostEntity from './post.entity';

@Entity({ name: 'category' })
export default class CategoryEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public name: string;

  @ManyToMany(() => PostEntity, (post) => post.categories)
  public posts?: PostEntity[];
}
