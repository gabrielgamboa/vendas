import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayload } from '../auth/dto/login-payload.dto';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [, authorization] = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ');

    const loginPayload: LoginPayload | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);
    // ver porque está tendo undefined

    if (!loginPayload) {
      return false;
    }

    request['user'] = loginPayload;

    return true;
  }
}
