import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from '../user/enum/user-type.enum';
import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { User } from '../decorators/user.decorator';
import { Cart } from './entities/cart.entity';
import { ReturnCartDto } from './dtos/return-cart.dto';

@Controller('cart')
@AuthenticateAndAuthorizateGuard(UserType.User, UserType.Admin)
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async insertProductInCart(
    @Body() data: InsertProductInCartDto,
    @User('id') userId: number,
  ): Promise<ReturnCartDto> {
    return new ReturnCartDto(
      await this.cartService.insertProductInCart(data, userId),
    );
  }

  @Get()
  async findCartByUserId(@User('id') userId: number): Promise<ReturnCartDto> {
    return new ReturnCartDto(await this.cartService.findActiveCartByUserId(userId, true));
  }
}
