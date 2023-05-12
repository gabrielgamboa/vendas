import { categoryMock } from '../../category/__mocks__/category.mock';
import { Product } from '../entities/product.entity';

export const productMock: Product = {
  categoryId: categoryMock.id,
  createdAt: new Date(),
  id: 7435,
  image: 'http://image.com',
  name: 'name product mock',
  price: 34.3,
  updatedAt: new Date(),
};
