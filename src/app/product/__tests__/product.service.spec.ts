import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from '../product.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { productMock } from '../__mocks__/product.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { createProductMock } from '../__mocks__/create-product.mock';
import { CategoryService } from '../../category/category.service';
import { categoryMock } from '../../category/__mocks__/category.mock';

describe('ProductService', () => {
  let service: ProductService;
  let categoryService: CategoryService;
  let productRepository: Repository<Product>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: CategoryService,
          useValue: {
            findCategoryById: jest.fn().mockResolvedValue(categoryMock),
          },
        },
        {
          provide: getRepositoryToken(Product),
          useValue: {
            find: jest.fn().mockResolvedValue([productMock]),
            save: jest.fn().mockResolvedValue(productMock),
          },
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
    categoryService = module.get<CategoryService>(CategoryService);
    productRepository = module.get<Repository<Product>>(
      getRepositoryToken(Product),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryService).toBeDefined();
    expect(productRepository).toBeDefined();
  });

  it('should be able to create new product', async () => {
    const product = await service.createProduct(createProductMock);
    expect(product).toBeDefined();
    expect(product).toEqual(productMock);
  });

  it('should return error in create new product if category doesnt exists', async () => {
    jest
      .spyOn(categoryService, 'findCategoryById')
      .mockRejectedValue(new BadRequestException());
    expect(service.createProduct(createProductMock)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should be able to list all products from database', async () => {
    const products = await service.findAll();
    expect(products).toEqual([productMock]);
    expect(products.length).toBeGreaterThan(0);
  });

  it('should return error to list all products if products not found', async () => {
    jest.spyOn(productRepository, 'find').mockResolvedValue([]);
    expect(service.findAll()).rejects.toBeInstanceOf(BadRequestException);
  });
});
