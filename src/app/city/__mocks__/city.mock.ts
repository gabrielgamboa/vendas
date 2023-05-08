import { stateMock } from '../../state/__mocks__/state.mock';
import { City } from '../entities/city.entity';

export const cityMock: City = {
  id: 1,
  name: 'city',
  createdAt: new Date(),
  updatedAt: new Date(),
  stateId: stateMock.id,
};
