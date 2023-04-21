import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';

@Injectable()
export class UserService {
  private users: User[] = [];

  async createUser(data: CreateUserDto): Promise<User> {
    const saltOrRounds = 10;
    const passwordHash = await hash(data.password, saltOrRounds);

    const user = {
      ...data,
      id: this.users.length + 1,
      password: passwordHash,
    };

    this.users.push(user);

    return user;
  }

  async getAll(): Promise<User[]> {
    return await this.users;
  }
}
