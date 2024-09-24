import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Bill } from 'src/bills/entities/bill.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;
  @OneToMany(() => Customer, customer => customer.user)
  customers: Customer[];

  @OneToMany(() => Employee, employee => employee.user)
  employees: Employee[];

  @OneToMany(() => Bill, bill => bill.user)
  bills: Bill[];

  @OneToMany(() => Supplier, supplier => supplier.user)
  suppliers: Supplier[];

}
