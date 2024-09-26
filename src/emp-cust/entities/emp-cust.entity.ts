// src/emp-cust/entities/emp-cust.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from 'src/employee/entities/employee.entity';
import { Customer } from 'src/customer/entities/customer.entity';
@Entity()
export class EmpCust {
  @PrimaryGeneratedColumn()
  empCustId: number;

  @ManyToOne(() => Employee, employee => employee.empCust, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'empId' })
  employee: Employee;

  @ManyToOne(() => Customer, customer => customer.empCust, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'custId' })
  customer: Customer;

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

  // You can add additional fields here if needed
}
