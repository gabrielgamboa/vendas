import { Module } from '@nestjs/common';
import { CartProductService } from './cart-product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartProduct } from './entities/cart-product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartProduct])],
  providers: [CartProductService],
  exports: [CartProductService],
})
export class CartProductModule {}
