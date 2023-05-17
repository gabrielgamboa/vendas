import { Category } from '../../category/entities/category.entity';
import { BaseEntity } from '../../../infra/db/base.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('product')
export class Product extends BaseEntity {
  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  image: string;

  @Column({ name: 'category_id', nullable: false })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
  category?: Category;
}
