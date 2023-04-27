import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    CacheModule.register({
      ttl: 9000000,
    }),
    TypeOrmModule.forFeature([City]),
  ],
  controllers: [CityController],
  providers: [CityService],
})
export class CityModule { }
