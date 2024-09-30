import { DataSource } from 'typeorm';
import { User } from './users/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Employee } from './employee/entities/employee.entity';
import { Supplier } from './supplier/entities/supplier.entity';
import { Category } from './category/entities/category.entity';
import { Product } from './products/entities/product.entity';
import { Bill } from './bills/entities/bill.entity';
import { CustProd } from './cust-prod/entities/cust-prod.entity';
import { ProdSupp } from './prod-supp/entities/prod-supp.entity';
import * as path from 'path';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 8000,
  username: 'root',
  password: 'rootuser',
  database: 'new_schema12345',
  entities: ['dist/**/*.entity.{ts,js}'],
  // migrations: [path.join(__dirname, 'migrations', '*.{ts,js}')],
  synchronize: true,
});