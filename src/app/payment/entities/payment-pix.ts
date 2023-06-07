import { ChildEntity, Column } from 'typeorm';
import { Payment } from './payment';

@ChildEntity()
export class PaymentPixEntity extends Payment {
  @Column({ name: 'code', nullable: false })
  code: string;

  @Column({ name: 'date_payment', nullable: false })
  datePayment: Date;
}
