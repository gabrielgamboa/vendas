import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './api/users/users.module';
import {DatabaseProvider} from './infra/db/database';

//TODO:
@Module({
  imports: [
    TypeOrmModule.forRoot(DatabaseProvider),
    UsersModule,
  ],
})
export class AppModule { }
