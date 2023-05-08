import { User } from '../entities/user.entity';
import { UserType } from '../enum/user-type.enum';

export const userMock: User = {
  id: 11,
  name: 'userMock',
  email: 'mock@mock.com',
  password: 'mock',
  typeUser: UserType.User,
  cpf: '44783746374',
  phone: '19 992258437',
  createdAt: new Date(),
  updatedAt: new Date(),
};
