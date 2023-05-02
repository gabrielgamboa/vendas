import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserService } from '../user/users.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userService: UserService,
  ) { }

  async createAddress(data: CreateAddressDto, userId: number) {
    await this.userService.getUserById(userId);
    //validar se cityId existe

    return await this.addressRepository.save({
      ...data,
      userId,
    });
  }
}
