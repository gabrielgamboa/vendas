import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/user.module';
import DatabaseProvider from './infra/db/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseProvider,
    }),
    UserModule,
  ],
})
export class AppModule {}
