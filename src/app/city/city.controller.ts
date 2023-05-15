import { Controller, Get, Param } from '@nestjs/common';
import { City } from './entities/city.entity';
import { CityService } from './city.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('city')
@ApiTags('City')
export class CityController {
  constructor(private citiesService: CityService) {}

  @Get('/:stateId')
  async getAllCitiesByStateId(
    @Param('stateId') stateId: number,
  ): Promise<City[]> {
    return await this.citiesService.getAllCitiesByStateId(stateId);
  }
}
