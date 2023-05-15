import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { hash } from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserType } from './enum/user-type.enum';

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
    const saltOrRounds = 10;
    const passwordHash = await hash(data.password, saltOrRounds);

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
}
