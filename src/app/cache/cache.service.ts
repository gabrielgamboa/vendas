import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getCache<T>(key: string): Promise<T> {
    return await this.cacheManager.get(key);
  }

  async setCache<T>(key: string, value: T) {
    await this.cacheManager.set(key, value);
  }
}
