import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginPayloadDto } from '../auth/dtos/login-payload.dto';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const [, authorization] = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ');

    const loginPayload: LoginPayloadDto | undefined = await this.jwtService
      .verifyAsync(authorization, {
        secret: process.env.JWT_SECRET,
      })
      .catch(() => undefined);

    if (!loginPayload) {
      return false;
    }

    request['user'] = loginPayload;

    return true;
  }
}
