import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { ROLES_KEY, RolesGuard } from './roles.guard';
import { UserType } from '../user/enum/user-type.enum';
import { AuthGuard } from './auth.guard';

export function AuthenticateAndAuthorizateGuard(...roles: UserType[]) {
  return applyDecorators(
    SetMetadata(ROLES_KEY, roles),
    UseGuards(AuthGuard, RolesGuard),
  );
}
