import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ReturnUserDto } from '../user/dtos/return-user-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post()
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return new ReturnUserDto(await this.authService.login(loginDto));
  }
}
