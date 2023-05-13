import { categoryMock } from '../../category/__mocks__/category.mock';
import { CreateProductDto } from '../dtos/create-product.dto';

export const createProductMock: CreateProductDto = {
  name: 'Product 1',
  image: 'https://images.com.br',
  price: 50.0,
  categoryId: categoryMock.id,
};
