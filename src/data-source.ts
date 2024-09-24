import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Employee } from './employee/entities/employee.entity';
import { Supplier } from './supplier/entities/supplier.entity';
import { Category } from './category/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { Bill } from './bills/entities/bill.entity';
import { CustProd } from './cust-prod/entities/cust-prod.entity';
import { EmpCust } from './emp-cust/entities/emp-cust.entity';
import { ProdSupp } from './prod-supp/entities/prod-supp.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 8000,
  username: 'root',
  password: 'rootuser',
  database: 'db8',
  entities: [User,Employee,Customer,Supplier,Category,Product,Bill,EmpCust,ProdSupp,CustProd],
  // migrations: [__dirname + '/src/migrations/**/*{.ts,.js}'],
  // migrations:['/migrations/*.ts'],
  migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: false,
});