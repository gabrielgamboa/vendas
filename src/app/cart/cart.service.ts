import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { Repository } from 'typeorm';
import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { CartProductService } from '../cart-product/cart-product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    private cartProductService: CartProductService,
  ) {}

  async createCart(userId: number): Promise<Cart> {
    return this.cartRepository.save({ userId, active: true });
  }

  async findActiveCartByUserId(
    userId: number,
    isRelations?: boolean,
  ): Promise<Cart> {
    const relations = isRelations
      ? {
          cartProducts: {
            product: true,
          },
        }
      : undefined;

    const cart = await this.cartRepository.findOne({
      where: {
        userId,
        active: true,
      },
      relations,
    });

    if (!cart) throw new BadRequestException('Cart active not found');

    return cart;
  }

  async insertProductInCart(
    data: InsertProductInCartDto,
    userId: number,
  ): Promise<Cart> {
    const cart = await this.findActiveCartByUserId(userId).catch(async () => {
      return this.createCart(userId);
    });

    await this.cartProductService.insertProductInCart(data, cart);

    return this.findActiveCartByUserId(userId, true);
  }
}
