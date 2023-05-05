import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/users.module';
import DatabaseProvider from './infra/db/database';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './app/address/address.module';
import { StateModule } from './app/state/state.module';
import { CityModule } from './app/city/city.module';
import { CacheModule } from './app/cache/cache.module';
import { AuthModule } from './app/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseProvider,
    }),
    UserModule,
    AddressModule,
    CityModule,
    StateModule,
    CacheModule,
    AuthModule,
    JwtModule,
  ],
})
export class AppModule {}
