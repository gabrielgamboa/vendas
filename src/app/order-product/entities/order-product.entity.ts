import { Order } from 'src/app/order/entities/order.entity';
import { Product } from 'src/app/product/entities/product.entity';
import { BaseEntity } from 'src/infra/db/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order_product' })
export class OrderProduct extends BaseEntity {
  @Column({ name: 'order_id', nullable: false })
  orderId: number;

  @Column({ name: 'product_id', nullable: false })
  productId: number;

  @Column({ name: 'amount', nullable: false })
  amount: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @ManyToOne(() => Order, (order) => order.orderProduct)
  @JoinColumn({ name: 'order_id', referencedColumnName: 'id'})
  order?: Order;

  @ManyToOne(() => Product, (product) => product.orderProduct)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id'})
  product?: Product;
}
