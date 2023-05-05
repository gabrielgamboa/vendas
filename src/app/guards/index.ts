import { UseGuards, applyDecorators } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { AuthGuard } from './auth.guard';

export function AuthenticateAndAuthorizateGuard() {
  return applyDecorators(UseGuards(AuthGuard), UseGuards(RolesGuard));
}
