import { Test, TestingModule } from '@nestjs/testing';
import { CartProductService } from '../cart-product.service';
import { ProductService } from '../../../app/product/product.service';
import { Repository } from 'typeorm';
import { CartProduct } from '../entities/cart-product.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { productMock } from '../../../app/product/__mocks__/product.mock';
import { cartMock } from '../../../app/cart/__mocks__/cart.mock';
import { returnDeleteMock } from '../../../app/__mocks__/return-delete.mock';

describe('CartProductService', () => {
  let service: CartProductService;
  let productService: ProductService;
  let cartProductRepository: Repository<CartProduct>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: ProductService,
          useValue: {
            findProductById: jest.fn().mockResolvedValue(productMock),
          },
        },
        {
          provide: getRepositoryToken(CartProduct),
          useValue: {
            save: '',
            findOne: '',
            delete: jest.fn().mockResolvedValue(returnDeleteMock),
          },
        },
        CartProductService,
      ],
    }).compile();

    service = module.get<CartProductService>(CartProductService);
    productService = module.get<ProductService>(ProductService);
    cartProductRepository = module.get<Repository<CartProduct>>(getRepositoryToken(CartProduct));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(productService).toBeDefined();
    expect(cartProductRepository).toBeDefined();
  });

  it('should be able to delete product from cart', async () => {
    const deleted = await service.deleteProductCart(productMock.id, cartMock.id);
    expect(deleted).toBeDefined();
    expect(deleted).toEqual(returnDeleteMock);
  });

  it('should throw exception delete error', async () => {
    jest.spyOn(cartProductRepository, 'delete').mockRejectedValue(new Error());
    expect(service.deleteProductCart(productMock.id, cartMock.id)).rejects.toThrowError();
  });
});
