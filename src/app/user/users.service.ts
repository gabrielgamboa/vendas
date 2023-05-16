import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { createHashedPassword, validatePassword } from '../../utils/password';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(data: CreateUserDto): Promise<User> {
    const emailAlreadyExists = await this.findUserByEmail(data.email).catch(
      () => undefined,
    );

    if (emailAlreadyExists)
      throw new BadRequestException('Email registered in system');

    const passwordHash = await createHashedPassword(data.password);

    return await this.usersRepository.save({
      ...data,
      typeUser: UserType.User,
      password: passwordHash,
    });
  }

  async getAll(): Promise<User[]> {
    return await this.usersRepository.find();
  }

  async findUserById(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserByIdUsingReferences(userId: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: {
        id: userId,
      },
      relations: {
        addresses: {
          city: {
            state: true,
          },
        },
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { email },
    });

    if (!user)
      throw new NotFoundException(`User with email ${email} not found`);

    return user;
  }

  async updatePasswordUser(
    data: UpdatePasswordDto,
    userId: number,
  ): Promise<User> {
    const user = await this.findUserById(userId);

    const isMatch = await validatePassword(
      data.oldPassword,
      user.password || '',
    );

    if (!isMatch) {
      throw new BadRequestException('Last password is invalid');
    }

    const passwordHashed = await createHashedPassword(data.newPassword);

    return this.usersRepository.save({
      ...user,
      password: passwordHashed,
    });
  }
}
