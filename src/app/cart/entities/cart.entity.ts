import { User } from 'src/app/user/entities/user.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('cart')
export class Cart extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;
}
