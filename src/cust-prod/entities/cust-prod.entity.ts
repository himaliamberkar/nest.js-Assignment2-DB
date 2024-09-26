
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('cust_prod')
export class CustProd {
    @PrimaryGeneratedColumn()
    cust_prod_id: number;

    @Column({name:'custId'})
    custId: number;

    @Column({name:'prodId'})
    prodId: number;

    @ManyToOne(() => Customer, customer => customer.custProds)
    @JoinColumn({name:'custId'})
    customer: Customer;

    @ManyToOne(() => Product, product => product.custProds)
    @JoinColumn({name:'prodId'})
    product: Product;

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
