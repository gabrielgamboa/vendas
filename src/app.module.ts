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
import { CategoryModule } from './app/category/category.module';
import { ProductModule } from './app/product/product.module';
import { CartModule } from './app/cart/cart.module';
import { CartProductModule } from './app/cart-product/cart-product.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailConfigService } from './infra/email/mail.config';
import { EmailModule } from './app/email/email.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local'],
    }),
    MailerModule.forRootAsync({
      useClass: MailConfigService,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: DatabaseProvider,
    }),
    JwtModule,
    UserModule,
    AddressModule,
    CityModule,
    StateModule,
    CacheModule,
    AuthModule,
    CategoryModule,
    ProductModule,
    CartModule,
    CartProductModule,
    EmailModule,
  ],
})
export class AppModule {}
