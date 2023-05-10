import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserType } from '../user/enum/user-type.enum';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { User } from '../decorators/user.decorator';
import { ReturnAddressDto } from './dtos/return-address.dto';

@Controller('address')
@AuthenticateAndAuthorizateGuard(UserType.User, UserType.Admin)
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createAddress(
    @Body() data: CreateAddressDto,
    @User('id') userId: number,
  ) {
    return await this.addressService.createAddress(data, userId);
  }

  @Get()
  async findAddressByUserId(
    @User('id') userId: number,
  ): Promise<ReturnAddressDto[]> {
    return (await this.addressService.findAddressByUserId(userId)).map(
      (address) => new ReturnAddressDto(address),
    );
  }
}
