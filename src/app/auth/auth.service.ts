import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) { }

  async login(data: LoginDto): Promise<User> {
    const user: User | undefined = await this.userService
      .findUserByEmail(data.email)
      .catch(() => undefined);

    const passwordMatch = await compare(data.password, user?.password);

    if (!user || !passwordMatch)
      throw new BadRequestException('Email or password invalid');

    return user;
  }
}
