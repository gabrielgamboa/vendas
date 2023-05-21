import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertProductInCartDto } from '../cart/dtos/insert-product-in-cart.dto';
import { Cart } from '../cart/entities/cart.entity';

@Injectable()
export class CartProductService {
  // constructor(
  //   @InjectRepository(CartProduct)
  //   private cartProductRepository: Repository<CartProduct>,
  // ) {}
  // async insertProductInCart(data: InsertProductInCartDto, cart: Cart): Promise<CartProduct> {
  //   return this.cartProductRepository.save({
  //     ...data,
  //   })
  // }
}
