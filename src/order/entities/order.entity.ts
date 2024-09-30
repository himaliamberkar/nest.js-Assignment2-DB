import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn,OneToMany, OneToOne } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { PurchaseItem } from 'src/purchaseitem/entities/purchaseitem.entity';
import { Bill } from 'src/bills/entities/bill.entity';

@Entity('order')
export class Order {
  @PrimaryGeneratedColumn()
  orderId: number;  // Primary Key

  @ManyToOne(() => Customer, (customer) => customer.orders, { onDelete: 'CASCADE' })
  customer: Customer;  // Foreign Key to Customer entity

  @Column()
  customerId: number;  // Foreign key column (customers ID)

  
  @OneToOne(() => Bill, bill => bill.order)
  bills: Bill[];


  @OneToMany(() => PurchaseItem, (purchaseItem) => purchaseItem.order)
  purchaseItems: PurchaseItem[];

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
