import { IsInt } from "class-validator";

export class UpdateProductInCartDto {
    @IsInt()
    productId: number;
  
    @IsInt()
    amount: number;
}