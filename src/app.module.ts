import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import DatabaseProvider from './infra/db/database';

//TODO:
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseProvider,
    }),
  ],
})
export class AppModule { }
