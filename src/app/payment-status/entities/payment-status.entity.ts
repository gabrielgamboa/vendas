import { Payment } from 'src/app/payment/entities/payment.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('payment_status')
export class PaymentStatus extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;

  @OneToMany(() => Payment, (payment) => payment.paymentStatus)
  payments: Payment[];
}

