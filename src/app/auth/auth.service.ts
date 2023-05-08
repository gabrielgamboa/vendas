import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dto/return-login.dto';
import { ReturnUserDto } from '../user/dtos/return-user-dto';
import { LoginPayload } from './dto/login-payload.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(data: LoginDto): Promise<ReturnLoginDto> {
    const user = await this.userService
      .findUserByEmail(data.email)
      .catch(() => undefined);

    const passwordMatch = await compare(data.password, user?.password);

    if (!user || !passwordMatch)
      throw new BadRequestException('Email or password invalid');

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
