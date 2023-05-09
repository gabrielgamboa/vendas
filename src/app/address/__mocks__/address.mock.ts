import { cityMock } from '../../city/__mocks__/city.mock';
import { Address } from '../entities/address.entity';
import { userMock } from '../../user/__mocks__/user.mock';

export const addressMock: Address = {
  cep: '43253252',
  cityId: cityMock.id,
  complement: 'llkdfja',
  createdAt: new Date(),
  id: 57546,
  number: 654,
  updatedAt: new Date(),
  userId: userMock.id,
};
