import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from 'src/order/entities/order.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, DeleteDateColumn, UpdateDateColumn, JoinColumn, OneToOne } from 'typeorm';


@Entity('bill')
export class Bill {
  @PrimaryGeneratedColumn({ name: 'billId' })
  billId: number; // Primary key for the bill

  @Column({ name: 'custId' })
  custId: number; // Customer ID associated with the bill

  @Column({ name: 'orderId' })
  orderId: number; 
  // Order ID linked to the bill

  @Column()
  amount: number; 

  @ManyToOne(() => Customer, customer => customer.bills, { eager: true })
  @JoinColumn({ name: 'custId' }) // Foreign key in the Bill table
  customer: Customer; 
  
  @OneToOne(() => Order, order => order.bills, { eager: true })
  @JoinColumn({ name: 'orderId' }) // Foreign key in the Bill table
  order: Order; // 

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
