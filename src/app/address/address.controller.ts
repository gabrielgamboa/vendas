import {
  Body,
  Controller,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserType } from '../user/enum/user-type.enum';
import { AuthenticateAndAuthorizateGuard } from '../guards';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post('/:userId')
  @AuthenticateAndAuthorizateGuard(UserType.User)
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() data: CreateAddressDto,
    @Param('userId') userId: number,
  ) {
    return await this.addressService.createAddress(data, userId);
  }
}
