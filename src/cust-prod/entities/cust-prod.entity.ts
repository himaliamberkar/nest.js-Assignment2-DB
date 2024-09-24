
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity('cust_prod')
export class CustProd {
    @PrimaryGeneratedColumn()
    cust_prod_id: number;

    @Column()
    custId: number;

    @Column()
    prodId: number;

    @ManyToOne(() => Customer, customer => customer.custProds)
    customer: Customer;

    @ManyToOne(() => Product, product => product.custProds)
    product: Product;
}
