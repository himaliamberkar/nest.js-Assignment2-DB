// src/categories/entities/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from '../../products/entities/product.entity'; // Import Product entity
import { Bill } from 'src/bills/entities/bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';


@Entity('category')
export class Category {
  @PrimaryGeneratedColumn()
  cateId: number; // Primary key for the category

  @Column()
  cName: string;  // Category name

  @Column({ nullable: true })
  description: string;  // Category description

//   One-to-Many relationship: A category can have multiple products
  @OneToMany(() => Product, product => product.category)
  products: Product[];

//   @OneToMany(() => Bill, bill => bill.category)
// bills: Bill[];

@OneToMany(() => Supplier, supplier => supplier.category)
suppliers: Supplier[];

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
