import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { Supplier } from 'src/supplier/entities/supplier.entity';

@Entity('prod_supp')
export class ProdSupp {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name:'prodId'})
    prodId: number;

    @Column({name:'suppId'})
    suppId: number;

    @ManyToOne(() => Product, (product) => product.prodSupp)
    @JoinColumn({name:'prodId'})
    product: Product;

    @ManyToOne(() => Supplier, (supplier) => supplier.prodSupp)
    @JoinColumn({name:'suppId'})
    supplier: Supplier;

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
