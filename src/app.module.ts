import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import DatabaseProvider from './infra/db/database';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseProvider,
    }),
    UserModule,
  ],
})
export class AppModule {}
