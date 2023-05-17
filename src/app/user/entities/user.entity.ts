import { Address } from '../../address/entities/address.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('user')
export class User extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ nullable: false })
  cpf: string;

  @Column()
  phone: string;

  @Column({ name: 'type_user' })
  typeUser: number;

  @OneToMany(() => Address, (address) => address.user)
  addresses?: Address[];
}
