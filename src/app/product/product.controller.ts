import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dtos/return-product.dto';
import { CreateProductDto } from './dtos/create-product.dto';
import { DeleteResult } from 'typeorm';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @AuthenticateAndAuthorizateGuard(UserType.Admin, UserType.User)
  async findAll(): Promise<ReturnProductDto[]> {
    return (await this.productService.findAll()).map(
      (product) => new ReturnProductDto(product),
    );
  }

  @Post()
  @AuthenticateAndAuthorizateGuard(UserType.Admin, UserType.User)
  @UsePipes(ValidationPipe)
  async createProduct(@Body() data: CreateProductDto): Promise<Product> {
    return await this.productService.createProduct(data);
  }

  @Put('/:productId')
  @AuthenticateAndAuthorizateGuard(UserType.Admin)
  @UsePipes(ValidationPipe)
  async updateProduct(
    @Body() data: UpdateProductDto,
    @Param('productId') productId: number,
  ): Promise<Product> {
    return await this.productService.updateProductById(data, productId);
  }

  @Delete('/:productId')
  @AuthenticateAndAuthorizateGuard(UserType.Admin, UserType.User)
  async deleteProductById(
    @Param('productId') productId: number,
  ): Promise<DeleteResult> {
    return await this.productService.deleteProductById(productId);
  }
}
