import { ReturnCityDto } from 'src/app/city/dtos/return-city.dto';
import { Address } from '../entities/address.entity';

export class ReturnAddressDto {
  complement: string;
  number: number;
  cep: string;
  city?: ReturnCityDto;

  constructor(address: Address) {
    this.complement = address.complement;
    this.cep = address.cep;
    this.number = address.number;
    this.city = address.city ? new ReturnCityDto(address.city) : undefined;
  }
}
