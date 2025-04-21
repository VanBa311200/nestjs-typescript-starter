import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import AddressEntity from './address.entity';
import PostEntity from './post.entity';

@Entity('user')
export default class UserEntity {
  @PrimaryGeneratedColumn()
  public id?: number;

  @Column({ unique: true })
  public email: string;

  @Column()
  public name: string;

  @Column()
  @Exclude()
  public password: string;

  @OneToOne(() => AddressEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({
    name: 'address_id',
  })
  public address: AddressEntity;

  @OneToMany(() => PostEntity, (post) => post.author)
  public posts: PostEntity[];
}
