import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { Repository } from 'typeorm';
import { CreateAddressDto } from './dtos/create-address.dto';
import { UserService } from '../user/users.service';
import { CityService } from '../city/city.service';

@Injectable()
export class AddressService {
  constructor(
    @InjectRepository(Address)
    private readonly addressRepository: Repository<Address>,
    private readonly userService: UserService,
    private readonly cityService: CityService,
  ) {}

  async createAddress(data: CreateAddressDto, userId: number) {
    await this.userService.findUserById(userId);
    await this.cityService.findCityById(data.cityId);

    return await this.addressRepository.save({
      ...data,
      userId,
    });
  }

  async findAddressByUserId(userId: number): Promise<Address[]> {
    const addresses = await this.addressRepository.find({
      where: { userId },
      relations: { city: { state: true } },
    });

    if (!addresses || !addresses.length)
      throw new NotFoundException(
        `Address not found for user with id: ${userId}`,
      );

    return addresses;
  }
}
