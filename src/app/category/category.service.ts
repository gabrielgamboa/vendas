import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCategoryDto } from './dtos/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async createCategory(data: CreateCategoryDto): Promise<Category> {
    const categoryExists = await this.findCategoryByName(data.name).catch(
      () => undefined,
    );

    if (categoryExists)
      throw new BadRequestException(
        `Category with name ${data.name} already exists`,
      );

    return await this.categoryRepository.save(data);
  }

  async findCategoryByName(name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { name } });

    if (!category)
      throw new BadRequestException(`Category with name ${name} not found`);

    return category;
  }

  async findCategoryById(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) throw new BadRequestException('Category not found');

    return category;
  }

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || !categories.length) {
      throw new NotFoundException('Categories not found');
    }

    return categories;
  }
}
