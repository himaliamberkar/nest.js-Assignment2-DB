// src/emp-cust/entities/emp-cust.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  // You can add additional fields here if needed
}
