import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany, CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/products/entities/product.entity';
import { ProdSupp } from 'src/prod-supp/entities/prod-supp.entity';

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ nullable:true })
  userId:number
  @Column({ nullable:true })
  cateId:number
  @Column({ nullable:true })
  prodId:number
 


  // Relation with User entity (Many suppliers can have one user)
  @ManyToOne(() => User, user => user.suppliers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'userId' })
  user: User;

  // Relation with Category entity (Many suppliers can have one category)
  @ManyToOne(() => Category, category => category.suppliers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'cateId' })
  category: Category;

  // Relation with Product entity (Many suppliers can have one product)
  @ManyToOne(() => Product, product => product.suppliers, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'prodId' })
  product: Product;

  @OneToMany(() => ProdSupp, (prodSupp) => prodSupp.supplier) // Create relation with ProdSupp
  prodSupp: ProdSupp[];

  @Column({ nullable:true })
  quantity: number;

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
