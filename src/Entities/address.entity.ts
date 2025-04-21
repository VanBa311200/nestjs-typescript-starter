import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import UserEntity from './user.entity';

@Entity({
  name: 'address',
})
export default class AddressEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public street: string;

  @Column()
  public city: string;

  @Column()
  public country: string;

  @OneToOne(() => UserEntity, (user) => user.address)
  public user: UserEntity;
}
