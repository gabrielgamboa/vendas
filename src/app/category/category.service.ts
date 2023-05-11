import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAllCategories(): Promise<Category[]> {
    const categories = await this.categoryRepository.find();

    if (!categories || !categories.length) {
      throw new NotFoundException('Categories not found');
    }

    return categories;
  }
}
