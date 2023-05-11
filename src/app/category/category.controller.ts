import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';
import { ReturnCategoryDto } from './dtos/return-category.dto';
import { AuthenticateAndAuthorizateGuard } from '../guards';
import { UserType } from '../user/enum/user-type.enum';

@Controller('category')
@AuthenticateAndAuthorizateGuard(UserType.User, UserType.Admin)
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async findAllCategories() {
    return (await this.categoryService.findAllCategories()).map(
      (category) => new ReturnCategoryDto(category),
    );
  }
}
