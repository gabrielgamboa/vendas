import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment.entity';

@ChildEntity()
export class PaymentPixEntity extends Payment {
  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;
}
