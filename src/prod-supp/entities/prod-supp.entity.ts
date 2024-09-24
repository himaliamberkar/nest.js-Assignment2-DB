import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Entity('prod_supp')
export class ProdSupp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    prodId: number;

    @Column()
    suppId: number;

    @ManyToOne(() => Product, (product) => product.prodSupp)
    product: Product;

    @ManyToOne(() => Supplier, (supplier) => supplier.prodSupp)
    supplier: Supplier;
}
