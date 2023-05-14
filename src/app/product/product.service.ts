import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async createProduct(data: CreateProductDto) {
    await this.categoryService.findCategoryById(data.categoryId);
    return await this.productRepository.save(data);
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    if (!products || !products.length)
      throw new BadRequestException('Products not found');

    return products;
  }

  async deleteProductById(productId: number): Promise<DeleteResult> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });
    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return await this.productRepository.delete({ id: productId });
  }
}
