import { Injectable, NotFoundException } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
    private cacheService: CacheService,
  ) {}

  async getByStateId(stateId: number): Promise<City[]> {
    const citiesInCache = await this.cacheService.getCache<City[]>(
      `state_${stateId}`,
    );

    if (citiesInCache) return citiesInCache;

    const cities = await this.citiesRepository.find({
      where: { stateId },
    });

    await this.cacheService.setCache<City[]>(`state_${stateId}`, cities);

    return cities;
  }

  async getCityById(cityId: number) {
    const city = await this.citiesRepository.findOne({
      where: {
        id: cityId,
      },
    });

    if (!city) throw new NotFoundException(`City with id ${cityId} not found`);

    return city;
  }
}
