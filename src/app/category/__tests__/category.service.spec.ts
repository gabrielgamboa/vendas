import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { categoryMock } from '../__mocks__/category.mock';
import { createCategoryMock } from '../__mocks__/create-category.mock';
import { BadRequestException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let categoryRepository: Repository<Category>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        {
          provide: getRepositoryToken(Category),
          useValue: {
            find: jest.fn().mockResolvedValue([categoryMock]),
            findOne: jest.fn().mockResolvedValue(categoryMock),
            save: jest.fn().mockResolvedValue(categoryMock),
          },
        },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    categoryRepository = module.get<Repository<Category>>(
      getRepositoryToken(Category),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(categoryRepository).toBeDefined();
  });

  it('should be able to create a new category', async () => {
    jest.spyOn(service, 'findCategoryByName').mockResolvedValue(undefined);
    const category = await service.createCategory(createCategoryMock);
    expect(category).toEqual(categoryMock);
  });

  it('should return error when create a new category when db fails', async () => {
    jest.spyOn(categoryRepository, 'save').mockRejectedValue(new Error());
    expect(service.createCategory(createCategoryMock)).rejects.toThrowError();
  });

  it('should return error when create a new category if category name already exists', async () => {
    expect(service.createCategory(createCategoryMock)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should be able to find category by name', async () => {
    const category = await service.findCategoryByName(categoryMock.name);
    expect(category).toEqual(categoryMock);
  });

  it('should return error in findCategoryByName if category doesnt exists', async () => {
    jest.spyOn(categoryRepository, 'findOne').mockResolvedValue(undefined);
    expect(
      service.findCategoryByName(categoryMock.name),
    ).rejects.toBeInstanceOf(BadRequestException);
  });

  it('should be able to list all categories', async () => {
    const categories = await service.findAllCategories();
    expect(categories).toEqual([categoryMock]);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('should return error if categories is empty', async () => {
    jest.spyOn(categoryRepository, 'find').mockResolvedValue([]);
    expect(service.findAllCategories()).rejects.toThrowError();
  });
});
