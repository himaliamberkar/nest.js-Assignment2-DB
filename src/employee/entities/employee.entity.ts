// src/employees/entities/employee.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // Import User entity
import { EmpCust } from 'src/emp-cust/entities/emp-cust.entity';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.employees, { onDelete: 'CASCADE' }) // Associate with User entity
  user: User;

  @OneToMany(() => EmpCust, (empCust) => empCust.employee)
  empCust: EmpCust[];

  @Column()
  userId: number; // User ID as a foreign key

  @Column()
  salary: number; // Employee salary

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
