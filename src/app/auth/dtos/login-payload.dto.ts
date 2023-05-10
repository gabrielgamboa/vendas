import { User } from '../../user/entities/user.entity';

export class LoginPayload {
  id: number;
  typeUser: number;

  constructor(user: User) {
    this.id = user.id;
    this.typeUser = user.typeUser;
  }
}
