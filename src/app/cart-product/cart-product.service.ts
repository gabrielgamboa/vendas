import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CartProduct } from './entities/cart-product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertProductInCartDto } from '../cart/dtos/insert-product-in-cart.dto';
import { Cart } from '../cart/entities/cart.entity';

@Injectable()
export class CartProductService {
  constructor(
    @InjectRepository(CartProduct)
    private cartProductRepository: Repository<CartProduct>,
  ) {}

  async createCartProduct(
    data: InsertProductInCartDto,
    cartId: number,
  ): Promise<CartProduct> {
    return this.cartProductRepository.save({
      cartId,
      productId: data.productId,
      amount: data.amount,
    });
  }

  async verifyProductInCart(
    productId: number,
    cartId: number,
  ): Promise<CartProduct> {
    const cartProduct = await this.cartProductRepository.findOne({
      where: {
        productId,
        cartId,
      },
    });

    if (!cartProduct) throw new NotFoundException('Product not found in cart');

    return cartProduct;
  }

  async insertProductInCart(
    data: InsertProductInCartDto,
    cart: Cart,
  ): Promise<CartProduct> {
    const cartProduct = await this.verifyProductInCart(
      data.productId,
      cart.id,
    ).catch(() => undefined);

    if (!cartProduct) {
      return this.createCartProduct(data, cart.id);
    }

    return this.cartProductRepository.save({
      ...cartProduct,
      amount: cartProduct.amount + data.amount,
    });
  }
}
