import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Product } from 'src/products/entities/product.entity';
import { Category } from 'src/category/entities/category.entity';

@Entity()
export class Bill {
  @PrimaryGeneratedColumn()
  billId: number;

  @Column()
  userId: number;

  @Column()
  cateId: number;

  @Column()
  prodId: number;

  @Column()
  billDate: Date;

  @ManyToOne(() => User, user => user.bills)
  user: User;

  @ManyToOne(() => Category, category => category.bills)
  category: Category;

  @ManyToOne(() => Product, product => product.bills)
  product: Product;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date;

  @Column({ name: 'createdBy', type: 'varchar', length: 255, nullable: true })
  createdBy: string;

  @Column({ name: 'updatedBy', type: 'varchar', length: 255, nullable: true })
  updatedBy: string;
}
