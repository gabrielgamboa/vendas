import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateProductDto } from './dtos/create-product.dto';
import { CategoryService } from '../category/category.service';
import { UpdateProductDto } from './dtos/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async createProduct(data: CreateProductDto) {
    await this.categoryService.findCategoryById(data.categoryId);
    await this.validateProductName(data.name);

    return await this.productRepository.save(data);
  }

  private async validateProductName(name: string): Promise<void> {
    const product = await this.productRepository.findOne({
      where: { name },
    });

    if (product) {
      throw new BadRequestException(`Product with name ${name} already exists`);
    }
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productRepository.find();

    if (!products || !products.length)
      throw new BadRequestException('Products not found');

    return products;
  }

  async findProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: {
        id: productId,
      },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }

  async deleteProductById(productId: number): Promise<DeleteResult> {
    await this.findProductById(productId);

    return await this.productRepository.delete({ id: productId });
  }

  async updateProductById(
    data: UpdateProductDto,
    productId: number,
  ): Promise<Product> {
    const product = await this.findProductById(productId);

    const productUpdated = {
      ...product,
      ...data,
    };

    return await this.productRepository.save(productUpdated);
  }
}
