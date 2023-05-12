import { Controller, Get } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from '../user/enum/user-type.enum';
import { ReturnProductDto } from './dtos/return-product.dto';

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
}
