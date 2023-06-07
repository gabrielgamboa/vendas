import { Address } from 'src/app/address/entities/address.entity';
import { OrderProduct } from 'src/app/order-product/entities/order-product.entity';
import { Payment } from 'src/app/payment/entities/payment.entity';
import { User } from 'src/app/user/entities/user.entity';
import { BaseEntity } from 'src/infra/db/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'order' })
export class Order extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'address_id', nullable: false })
  addressId: number;

  @Column({ name: 'date', nullable: false })
  date: Date;

  @Column({ name: 'payment_id', nullable: false })
  paymentId: number;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  user?: User;

  @ManyToOne(() => Address, (address) => address.orders)
  @JoinColumn({ name: 'address_id', referencedColumnName: 'id'})
  address?: Address;

  @ManyToOne(() => Payment, (payment) => payment.orders)
  @JoinColumn({ name: 'payment_id', referencedColumnName: 'id'})
  payment?: Payment;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProduct?: OrderProduct[];
}
