import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import UserEntity from './user.entity';
import CategoryEntity from './category.entity';

@Entity({
  name: 'post',
})
export default class PostEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column()
  public title: string;

  @Column()
  public content: string;

  @Column({ nullable: true })
  public category?: string;

  @ManyToOne(() => UserEntity, (author) => author.posts, {
    eager: true,
  })
  public author: UserEntity;

  @ManyToMany(() => CategoryEntity, (category) => category.posts)
  @JoinTable()
  public categories: CategoryEntity[];
}
