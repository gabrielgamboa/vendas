import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { UserService } from '../user/users.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { ReturnLoginDto } from './dtos/return-login.dto';
import { ReturnUserDto } from '../user/dtos/return-user-dto';
import { LoginPayloadDto } from './dtos/login-payload.dto';
import { validatePassword } from 'src/utils/password';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(data: LoginDto): Promise<ReturnLoginDto> {
    const user = await this.userService
      .findUserByEmail(data.email)
      .catch(() => undefined);

    const passwordMatch = validatePassword(data.password, user?.password || '');

    if (!user || !passwordMatch)
      throw new UnauthorizedException('Email or password invalid');

    return {
      accessToken: this.jwtService.sign({ ...new LoginPayloadDto(user) }),
      user: new ReturnUserDto(user),
    };
  }
}
