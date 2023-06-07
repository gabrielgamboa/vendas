import { Category } from '../../category/entities/category.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { CartProduct } from '../../../app/cart-product/entities/cart-product.entity';
import { OrderProduct } from 'src/app/order-product/entities/order-product.entity';

@Entity('product')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;

  @OneToMany(() => CartProduct, (cartProduct) => cartProduct.product)
  cartProducts?: CartProduct[];

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.product)
  orderProduct?: OrderProduct[];
}
