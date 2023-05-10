import { ReturnAddressDto } from '../../address/dtos/return-address.dto';
import { User } from '../entities/user.entity';
import { Address } from '../../address/entities/address.entity';

export class ReturnUserDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  cpf: string;
  addresses?: ReturnAddressDto[];

  constructor(user: User) {
    this.id = user.id;
    this.name = user.name;
    this.email = user.email;
    this.phone = user.phone;
    this.cpf = user.cpf;
    this.addresses = user.addresses
      ? user.addresses.map(
          (address) => new ReturnAddressDto(address as Address),
        )
      : undefined;
  }
}
