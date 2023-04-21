import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('user')
export class UserController {
  @Get()
  async getAll() {
    return JSON.stringify({ test: 123 });
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    return {
      ...data,
    };
  }
}
