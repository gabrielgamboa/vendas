import { Test, TestingModule } from '@nestjs/testing';
import { CacheService } from '../cache.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { userMock } from '../../user/__mocks__/user.mock';

describe('CacheService', () => {
  let service: CacheService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CacheService,
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: jest.fn().mockResolvedValue(userMock),
            set: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CacheService>(CacheService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to return user cached', async () => {
    const user = await service.getCache('key');
    expect(user).toEqual(userMock);
  });

  it('should be able to set user in cache', async () => {
    await service.setCache('key', userMock);
    const user = await service.getCache('key');
    expect(user).toEqual(user);
  });
});
