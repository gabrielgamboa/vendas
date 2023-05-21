import { IsInt } from 'class-validator';

export class InsertProductInCartDto {
  @IsInt()
  productId: number;

  @IsInt()
  amount: number;
}
