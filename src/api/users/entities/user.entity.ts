import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 120 })
  name: string;
  @Column('int')
  age: number;
  @Column({ length: 120 })
  email: string;

  constructor(user?: Partial<User>) {
    this.id = user.id;
    this.name = user.name;
    this.age = user.age;
    this.email = user.email;
  }
}
