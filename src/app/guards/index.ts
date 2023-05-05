import { UseGuards, applyDecorators } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
import { UserType } from '../user/enum/user-type.enum';
import { AuthGuard } from './auth.guard';
import { Roles } from '../decorators/roles.decorators';

export function AuthenticateAndAuthorizateGuard(role: UserType) {
  return applyDecorators(
    Roles(role),
    UseGuards(AuthGuard),
    UseGuards(RolesGuard),
  );
}
