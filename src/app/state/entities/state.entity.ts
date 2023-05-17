import { City } from '../../city/entities/city.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('state')
export class State extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  uf: string;

  @OneToMany(() => City, (city) => city.state)
  cities?: City[];
}
