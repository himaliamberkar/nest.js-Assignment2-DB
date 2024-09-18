// src/categories/entities/category.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from '../../products/entities/product.entity'; // Import Product entity

@Entity()
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
}
