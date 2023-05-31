import { Cart } from '../entities/cart.entity';
import { ReturnCartProductDto } from 'src/app/cart-product/dtos/return-cart-product.dto';

export class ReturnCartDto {
  id: number;
  userId: number;
  cartProducts: ReturnCartProductDto[];

  constructor(cart: Cart) {
    this.id = cart.id;
    this.userId = cart.userId
    this.cartProducts = cart.cartProducts
      ? cart.cartProducts.map(
          (cartProduct) => new ReturnCartProductDto(cartProduct),
        )
      : undefined;
  }
}
