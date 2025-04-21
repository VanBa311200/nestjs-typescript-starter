import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import PostEntity from '../Entities/post.entity';
import UserEntity from '../Entities/user.entity';
import AddressEntity from '../Entities/address.entity';
import CategoryEntity from '../Entities/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('POSTGRES_HOST'),
        port: configService.get('POSTGRES_PORT'),
        username: configService.get('POSTGRES_USER'),
        password: configService.get('POSTGRES_PASSWORD'),
        database: configService.get('POSTGRES_DB'),
        entities: [PostEntity, UserEntity, AddressEntity, CategoryEntity],
        synchronize: true,
      }),
    }),
  ],
})
export default class DataBaseModule {}
