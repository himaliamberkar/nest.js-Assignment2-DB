// src/products/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';// Import Category entity

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  prodId: number;  // Primary key for the product

  @Column()
  pName: string;   // Product name

  @Column({ nullable: true })
  description: string;  // Product description

  @Column()
  stockQuantity: number;  // Stock quantity of the product

  @Column('decimal')
  price: number;  // Price of the product

  @ManyToOne(() => Category, category => category.cateId, { onDelete: 'CASCADE' }) // Foreign key to Category
  category: Category;

  @Column()
  cateId: number;  // Foreign key column (Category ID)
}
