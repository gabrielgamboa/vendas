import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { StateService } from '../state.service';
import { State } from '../entities/state.entity';
import { stateMock } from '../__mocks__/state.mock';

describe('StateService', () => {
  let service: StateService;
  let stateRepository: Repository<State>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StateService,
        {
          provide: getRepositoryToken(State),
          useValue: {
            find: jest.fn().mockResolvedValue([stateMock]),
          },
        },
      ],
    }).compile();

    service = module.get<StateService>(StateService);
    stateRepository = module.get<Repository<State>>(getRepositoryToken(State));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(stateRepository).toBeDefined();
  });

  it('should be able to get all states', async () => {
    const states = await service.getAll();
    expect(states).toEqual([stateMock]);
    expect(states.length).toBeGreaterThan(0);
  });

  it('should return error when get all states', async () => {
    jest.spyOn(stateRepository, 'find').mockRejectedValue(new Error());
    expect(service.getAll()).rejects.toThrowError();
  });
});
