import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CityService } from '../city.service';
import { City } from '../entities/city.entity';
import { CacheService } from '../../cache/cache.service';
import { cityMock } from '../__mocks__/city.mock';

describe('CityService', () => {
  let service: CityService;
  let cacheService: CacheService;
  let cityRepository: Repository<City>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CityService,
        {
          provide: CacheService,
          useValue: {
            getCache: jest.fn().mockResolvedValue([cityMock]),
            setCache: jest.fn().mockResolvedValue({}),
          },
        },
        {
          provide: getRepositoryToken(City),
          useValue: {
            findOne: jest.fn().mockResolvedValue(cityMock),
            find: jest.fn().mockResolvedValue([cityMock]),
          },
        },
      ],
    }).compile();

    service = module.get<CityService>(CityService);
    cacheService = module.get<CacheService>(CacheService);
    cityRepository = module.get<Repository<City>>(getRepositoryToken(City));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(cacheService).toBeDefined();
    expect(cityRepository).toBeDefined();
  });

  it('should return city in findCityById', async () => {
    const city = await service.findCityById(cityMock.id);
    expect(city).toEqual(cityMock);
  });

  it('should return error in findCityById when city is not found', async () => {
    jest.spyOn(cityRepository, 'findOne').mockResolvedValue(undefined);
    expect(service.findCityById(cityMock.id)).rejects.toThrowError();
  });

  it('should return cities in getAllCitiesByStateId', async () => {
    const cities = await service.getAllCitiesByStateId(cityMock.id);
    expect(cities).toEqual([cityMock]);
  });

  it('should return cities in getAllCitiesByStateId when they are not cached', async () => {
    jest.spyOn(cacheService, 'getCache').mockResolvedValue(null);
    const cities = await service.getAllCitiesByStateId(cityMock.id);
    expect(cities).toEqual([cityMock]);
  });
});
