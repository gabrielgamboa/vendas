import { BaseEntity } from '../../../infra/db/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('payment_status')
export class PaymentStatusEntity extends BaseEntity {
  @Column({ name: 'name', nullable: false })
  name: string;
}

