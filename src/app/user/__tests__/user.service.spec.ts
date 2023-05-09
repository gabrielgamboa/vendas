import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../users.service';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { userMock } from '../__mocks__/user.mock';
import { createUserMock } from '../__mocks__/create-user.mock';

describe('UserService', () => {
  let service: UserService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn().mockResolvedValue(userMock),
            save: jest.fn().mockResolvedValue(userMock),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  it('should create user in createUser', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    const user = await service.createUser(createUserMock);
    expect(user).toEqual(userMock);
  });

  it('should not create user in createUser if email already exists', async () => {
    expect(service.createUser(createUserMock)).rejects.toThrowError();
  });

  it('should return user in findUserByEmail', async () => {
    const user = await service.findUserByEmail(userMock.email);
    expect(user).toEqual(userMock);
  });

  it('should not return user if email dont exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(
      service.findUserByEmail('someEmail@mock.com'),
    ).rejects.toThrowError();
  });

  it('should return user in findUserById', async () => {
    const user = await service.findUserById(userMock.id);
    expect(user).toEqual(user);
  });

  it('should not return user in findUserById if user does not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findUserById(userMock.id)).rejects.toThrowError();
  });

  it('should return user in findUserByIdUsingReferences', async () => {
    const user = await service.findUserByIdUsingReferences(userMock.id);
    expect(user).toEqual(userMock);
  });

  it('should not return user in findUserByIdUsingReferences if user does not exists', async () => {
    jest.spyOn(userRepository, 'findOne').mockResolvedValue(undefined);
    expect(
      service.findUserByIdUsingReferences(userMock.id),
    ).rejects.toThrowError();
  });
});
