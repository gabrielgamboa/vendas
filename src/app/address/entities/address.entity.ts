import { BaseEntity } from '../../../infra/db/base.entity';
import { City } from '../../city/entities/city.entity';
import { User } from '../../user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
export class Address extends BaseEntity {
  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ nullable: true })
  complement: string;

  @Column({ nullable: false })
  number: number;

  @Column({ nullable: false })
  cep: string;

  @Column({ name: 'city_id', nullable: false })
  cityId: number;

  @ManyToOne(() => User, (user) => user.addresses)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: User;

  @ManyToOne(() => City, (city) => city.addresses)
  @JoinColumn({ name: 'city_id', referencedColumnName: 'id' })
  city?: City;
}
