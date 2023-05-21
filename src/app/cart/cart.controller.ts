import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from '../user/enum/user-type.enum';
import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { User } from '../decorators/user.decorator';
import { Cart } from './entities/cart.entity';

@Controller('cart')
@AuthenticateAndAuthorizateGuard(UserType.User, UserType.Admin)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  async insertProductInCart(
    @Body() data: InsertProductInCartDto,
    @User('id') userId: number,
  ): Promise<Cart> {
    return this.cartService.insertProductInCart(data, userId);
  }
}
