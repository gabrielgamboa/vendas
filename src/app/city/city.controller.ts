import { Controller, Get, Param } from '@nestjs/common';
import { City } from './entities/city.entity';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private citiesService: CityService) { }

  @Get('/:stateId')
  async getByStateId(@Param('stateId') stateId: number): Promise<City[]> {
    return await this.citiesService.getByStateId(stateId);
  }
}
