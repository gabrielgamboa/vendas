import { SetMetadata, UseGuards, applyDecorators } from '@nestjs/common';
import { RolesGuard } from './roles.guard';
// import { AuthGuard } from './auth.guard';
import { ROLES_KEY, Roles } from '../decorators/roles.decorators';
import { UserType } from '../user/enum/user-type.enum';
import { AuthGuard } from './auth.guard';

export function AuthenticateAndAuthorizateGuard(role: UserType) {
  return applyDecorators(
    UseGuards(AuthGuard),
    SetMetadata(ROLES_KEY, role),
    UseGuards(RolesGuard),
  );
}
