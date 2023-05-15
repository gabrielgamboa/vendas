import { Controller, Get } from '@nestjs/common';
import { StateService } from './state.service';
import { State } from './entities/state.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('state')
@ApiTags('State')
export class StateController {
  constructor(private readonly statesService: StateService) {}

  @Get()
  async getAll(): Promise<State[]> {
    return await this.statesService.getAll();
  }
}
