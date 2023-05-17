import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../../infra/db/base.entity';
import { Cart } from '../../cart/entities/cart.entity';
import { Product } from '../../../app/product/entities/product.entity';

@Entity('cart_product')
export class CartProduct extends BaseEntity {
  @Column({ name: 'cart_id' })
  cartId: number;

  @Column({ name: 'product_id' })
  productId: number;

  @Column()
  amount: number;

  @ManyToOne(() => Cart, (cart) => cart.cartProduct)
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart?: Cart;

  @ManyToOne(() => Product, (product) => product.cartProduct)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product?: Product;
}
