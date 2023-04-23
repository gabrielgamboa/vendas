import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './app/user/users.module';
import DatabaseProvider from './infra/db/database';
import { ConfigModule } from '@nestjs/config';
import { AddressModule } from './src/app/address/address.module';
import { CityModule } from './src/app/city/city.module';
import { StateModule } from './src/app/state/state.module';
import { AddressModule } from './app/address/address.module';
import { StateModule } from './app/state/state.module';
import { CityModule } from './app/city/city.module';

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
  ],
})
export class AppModule { }
