import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { ReturnUserDto } from './dtos/return-user-dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { User } from '../decorators/user.decorator';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from './enum/user-type.enum';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @AuthenticateAndAuthorizateGuard(UserType.Admin, UserType.User)
  async getAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAll()).map(
      (user) => new ReturnUserDto(user),
    );
  }

  @Get('/:userId')
  @AuthenticateAndAuthorizateGuard(UserType.Admin, UserType.User)
  async findUserByIdUsingReferences(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.findUserByIdUsingReferences(userId),
    );
  }

  @Post()
  @UsePipes(new ValidationPipe())
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
  })
  async create(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }

  @Patch()
  @UsePipes(ValidationPipe)
  @AuthenticateAndAuthorizateGuard(UserType.Admin, UserType.User)
  async updatePassword(
    @Body() data: UpdatePasswordDto,
    @User('id') userId: number,
  ) {
    return this.userService.updatePasswordUser(data, userId);
  }
}
