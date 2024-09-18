// src/employees/entities/employee.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from 'src/users/entities/user.entity'; // Import User entity

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.employees, { onDelete: 'CASCADE' }) // Associate with User entity
  user: User;

  @Column()
  userId: number; // User ID as a foreign key

  @Column()
  salary: number; // Employee salary
}
