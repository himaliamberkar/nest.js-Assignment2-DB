// src/customers/entities/customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import User entity

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  // Foreign key reference to the User entity
  @ManyToOne(() => User, user => user.customers, { onDelete: 'CASCADE' }) // Create relation with User
  user: User;

  @Column()
  userId: number; // User ID as a foreign key
}
