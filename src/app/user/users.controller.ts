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
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<ReturnUserDto[]> {
    return (await this.userService.getAll()).map(
      (user) => new ReturnUserDto(user),
    );
  }

  @Get('/:userId')
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
}
