import { Inject, Injectable } from '@nestjs/common';
import { City } from './entities/city.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private citiesRepository: Repository<City>,
    @Inject(CACHE_MANAGER)
    private cacheManager: Cache,
  ) { }

  async getByStateId(stateId: number): Promise<City[]> {
    const citiesInCache: City[] = await this.cacheManager.get(
      `state_${stateId}`,
    );

    if (citiesInCache) return citiesInCache;

    const cities = await this.citiesRepository.find({
      where: { stateId },
    });

    await this.cacheManager.set(`state_${stateId}`, cities);

    return cities;
  }
}
