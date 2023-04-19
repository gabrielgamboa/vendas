import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

const users: User[] = [
  new User({ name: 'Gabriel de Barros', age: 15 }),
  new User({ name: 'Teste', age: 17 }),
];

describe('UsersService', () => {
  let usersService: UsersService;
  let usersRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            save: jest.fn(),
            find: jest.fn().mockResolvedValue(users),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersRepository).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all users', async () => {
      const users = await usersService.findAll();
      expect(users).toBe(users);
      expect(usersRepository.find).toHaveBeenCalledTimes(1);
    });
  });
});
