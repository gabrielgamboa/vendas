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

@Controller('cart')
@AuthenticateAndAuthorizateGuard(UserType.User)
export class CartController {
  constructor(private readonly cartService: CartService) {}
}
