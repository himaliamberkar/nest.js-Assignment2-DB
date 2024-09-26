// src/customers/entities/customer.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity'; // Import User entity
import { EmpCust } from 'src/emp-cust/entities/emp-cust.entity';
import { CustProd } from 'src/cust-prod/entities/cust-prod.entity';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;
  // Foreign key reference to the User entity
  @ManyToOne(() => User, user => user.customers, { onDelete: 'CASCADE' }) // Create relation with User
  user: User;

  @Column()
  userId: number; // User ID as a foreign key


  @OneToMany(() => EmpCust, (empCust) => empCust.customer)
  empCust: EmpCust[];

  @OneToMany(() => CustProd, custProd => custProd.customer) // Create relation with CustProd
  custProds: CustProd[];

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
