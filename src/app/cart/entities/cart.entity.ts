import { User } from 'src/app/user/entities/user.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CartProduct } from 'src/app/cart-product/entities/cart-product.entity';

@Entity('cart')
export class Cart extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.cart)
  cartProduct?: CartProduct[];
}
