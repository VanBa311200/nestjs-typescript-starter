import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import * as Joi from 'joi';

import UsersModule from './Users/users.module';
import PostModule from './Posts/posts.module';
import AuthModule from './Auth/auth.module';
import DataBaseModule from './database/database.module';
import { CategoryModule } from './Category/category.module';

@Module({
  imports: [
    CategoryModule,
    PostModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        // Database
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number().port().default(3000),

        // Json Web Token
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION_TIME: Joi.string().required(),
      }),
    }),
    DataBaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
