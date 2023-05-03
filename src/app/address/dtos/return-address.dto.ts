import { Address } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;

  constructor(address: Address) {
    this.complement = address.complement;
    this.cep = address.cep;
    this.number = address.number;
  }
}
