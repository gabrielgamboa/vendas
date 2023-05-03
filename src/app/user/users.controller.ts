import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserService } from './users.service';
import { ReturnUserDto } from './dtos/return-user-dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  async getAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAll()).map(
      (user) => new ReturnUserDto(user),
    );
  }

  @Get('/:userId')
  async getUserByIdUsingReferences(
    @Param('userId') userId: number,
  ): Promise<ReturnUserDto> {
    return new ReturnUserDto(
      await this.userService.getUserByIdUsingReferences(userId),
    );
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() data: CreateUserDto) {
    return await this.userService.createUser(data);
  }
}
