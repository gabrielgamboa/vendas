import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  Patch,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from '../user/enum/user-type.enum';
import { InsertProductInCartDto } from './dtos/insert-product-in-cart.dto';
import { User } from '../decorators/user.decorator';
import { ReturnCartDto } from './dtos/return-cart.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductInCartDto } from './dtos/update-product-in-cart-dto';
import { Cart } from './entities/cart.entity';

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
    return new ReturnCartDto(
      await this.cartService.findActiveCartByUserId(userId, true),
    );
  }

  @Patch()
  @UsePipes(ValidationPipe)
  async updateProductInCart(@Body() data: UpdateProductInCartDto, @User('id') userId: number): Promise<Cart> {
    return this.cartService.updateProductInCart(data, userId);
  }

  @Delete()
  async clearCart(@User('id') userId: number): Promise<DeleteResult> {
    return this.cartService.clearCart(userId);
  }

  @Delete('/product/:productId')
  async deleteProductCart(
    @Param('productId') productId: number,
    @User('id') userId: number,
  ): Promise<DeleteResult> {
    return this.cartService.deleteProductInCart(productId, userId);
  }
}
