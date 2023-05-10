import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/users.service';
import { JwtService } from '@nestjs/jwt';
import { userMock } from '../user/__mocks__/user.mock';
import { jwtMock } from './__mocks__/jwt.mock';
import { loginMock } from './__mocks__/login-payload.mock';
import { ReturnUserDto } from '../user/dtos/return-user-dto';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            findUserByEmail: jest.fn().mockResolvedValue(userMock),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn(() => jwtMock),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
  });

  it('should be able to generate a token when authenticate user with email and password valid', async () => {
    const user = await service.login(loginMock);

    expect(user).toEqual({
      accessToken: jwtMock,
      user: new ReturnUserDto(userMock),
    });
  });

  it('should return error when user email is invalid', async () => {
    // ver pq ta dando erro
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);
    expect(service.login(loginMock)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });

  it('should return error when user password is invalid', async () => {
    expect(
      service.login({ ...loginMock, password: '123' }),
    ).rejects.toBeInstanceOf(UnauthorizedException);
  });

  it('should return error in UserService', async () => {
    jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(undefined);
    expect(service.login(loginMock)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
  });
});
