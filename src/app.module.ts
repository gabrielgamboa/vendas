import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { UsersModule } from './api/users/users.module';

//TODO:
// 1. verificar como separar o objeto de configuração em outro canto
// 2. utilizar CLI do typeorm pra criar migrations na pasta infra/db/migrations
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'booktop',
      entities: [join(__dirname, 'api', '**', 'entities', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'infra', 'db', 'migrations', '*.{ts,js}')],
      synchronize: false,
    }),
    UsersModule,
  ],
})
export class AppModule { }
