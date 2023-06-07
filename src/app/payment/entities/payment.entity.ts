import { Order } from 'src/app/order/entities/order.entity';
import { PaymentStatus } from 'src/app/payment-status/entities/payment-status.entity';
import { BaseEntity } from 'src/infra/db/base.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  TableInheritance,
} from 'typeorm';

@Entity({ name: 'payment' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class Payment extends BaseEntity {
  @Column({ name: 'status_id', nullable: false })
  statusId: number;

  @Column({ name: 'price', nullable: false })
  price: number;

  @Column({ name: 'discount', nullable: false })
  discount: number;

  @Column({ name: 'final_price', nullable: false })
  finalPrice: number;

  @Column({ name: 'type', nullable: false })
  type: string;


  @OneToMany(() => Order, (order) => order.payment)
  orders?: Order[];
  
  @ManyToOne(() => PaymentStatus, (paymentStatus) => paymentStatus.payments)
  @JoinColumn({ name: 'status_id', referencedColumnName: 'id'})
  paymentStatus?: PaymentStatus;
}
