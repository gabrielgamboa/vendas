import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { JwtModule } from '@nestjs/jwt';
import { CartProductModule } from '../cart-product/cart-product.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), JwtModule, CartProductModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
