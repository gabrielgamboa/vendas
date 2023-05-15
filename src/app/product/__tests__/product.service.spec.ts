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
import { returnDeletedProductMock } from '../__mocks__/return-deleted-product.mock';
import { rejects } from 'assert';

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
            findOne: jest.fn().mockResolvedValue(productMock),
            delete: jest.fn().mockResolvedValue(returnDeletedProductMock),
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
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
    const product = await service.createProduct(createProductMock);
    expect(product).toBeDefined();
    expect(product).toEqual(productMock);
  });

  it('should return error in create new product product already exists with same name', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(productMock);
    expect(service.createProduct(createProductMock)).rejects.toThrowError();
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

  it('should be able to delete a product', async () => {
    const product = await service.deleteProductById(productMock.id);
    expect(product).toEqual(returnDeletedProductMock);
  });

  it('should return error in delete product if product doesnt exists', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
    expect(service.deleteProductById(productMock.id)).rejects.toThrowError();
  });

  it('should be able to find product by id', async () => {
    const product = await service.findProductById(productMock.id);
    expect(product).toBeDefined();
    expect(product).toEqual(productMock);
  });

  it('should return error in find product by id if product doesnt exists', async () => {
    jest.spyOn(productRepository, 'findOne').mockResolvedValue(null);
    expect(service.findProductById(productMock.id)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });
});
