import { BaseEntity } from '../../../infra/db/base.entity';
import { Product } from '../../product/entities/product.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('category')
export class Category extends BaseEntity {
  @Column()
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products?: Product[];
}
