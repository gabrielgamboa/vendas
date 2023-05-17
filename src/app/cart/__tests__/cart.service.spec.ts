import { Test, TestingModule } from '@nestjs/testing';
import { CartService } from '../cart.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cart } from '../entities/cart.entity';
import { Repository } from 'typeorm';

describe('CartService', () => {
  let service: CartService;
  let cartRepository: Repository<Cart>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Cart),
          useValue: {},
        },
        CartService,
      ],
    }).compile();

    service = module.get<CartService>(CartService);
    cartRepository = module.get<Repository<Cart>>(getRepositoryToken(Cart));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
