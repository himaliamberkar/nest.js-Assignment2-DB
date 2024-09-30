// src/products/entities/product.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Category } from 'src/category/entities/category.entity';// Import Category entity
import { Bill } from 'src/bills/entities/bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';
import { CustProd } from 'src/cust-prod/entities/cust-prod.entity';
import { ProdSupp } from 'src/prod-supp/entities/prod-supp.entity';
import { PurchaseItem } from 'src/purchaseitem/entities/purchaseitem.entity';

@Entity('product')
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


  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.product)
  purchaseItems: PurchaseItem[];

  @Column()
  cateId: number;  // Foreign key column (Category ID)

//  @OneToMany(() => Bill, bill => bill.product)
// bills: Bill[];

@OneToMany(() => Supplier, supplier => supplier.product)
suppliers: Supplier[];


@OneToMany(() => CustProd, custProd => custProd.product) // Create relation with CustProd
custProds: CustProd[];

@OneToMany(() => ProdSupp, (prodSupp) => prodSupp.product) // Create relation with ProdSupp
prodSupp: ProdSupp[];

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
