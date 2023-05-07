import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserType } from '../user/enum/user-type.enum';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { User } from '../decorators/user.decorator';

@Controller('address')
@AuthenticateAndAuthorizateGuard(UserType.User)
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() data: CreateAddressDto,
    @User('id') userId: number,
  ) {
    return await this.addressService.createAddress(data, userId);
  }
}
