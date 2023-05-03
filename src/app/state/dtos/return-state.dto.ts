import { State } from '../entities/state.entity';

export class ReturnStateDto {
  name: string;
  uf: string;

  constructor(state: State) {
    this.name = state.name;
    this.uf = state.uf;
  }
}
