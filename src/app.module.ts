import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './api/users/users.module';
import DatabaseProvider from './infra/db/database';

//TODO:
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseProvider,
    }),
    UsersModule,
  ],
})
export class AppModule { }
