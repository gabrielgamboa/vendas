import { BaseEntity } from '../../../infra/db/base.entity';
import { Address } from '../../address/entities/address.entity';
import { State } from '../../state/entities/state.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity('city')
export class City extends BaseEntity {
  @Column({ name: 'state_id', nullable: false })
  stateId: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => Address, (address) => address.city)
  addresses?: Address[];

  @ManyToOne(() => State, (state) => state.cities)
  @JoinColumn({ name: 'state_id', referencedColumnName: 'id' })
  state?: State;
}
