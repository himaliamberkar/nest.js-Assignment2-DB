import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './products/products.module';
import { BillsModule } from './bills/bills.module';
import { SuppliersModule } from './supplier/supplier.module';
import { EmpCustModule } from './emp-cust/emp-cust.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Employee } from './employee/entities/employee.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Bill } from './bills/entities/bill.entity';
import { Supplier } from './supplier/entities/supplier.entity';
import { EmpCust } from './emp-cust/entities/emp-cust.entity';
import { ProdSuppModule } from './prod-supp/prod-supp.module';
import { CustProdModule } from './cust-prod/cust-prod.module';
import { ProdSupp } from './prod-supp/entities/prod-supp.entity';
import { CustProd } from './cust-prod/entities/cust-prod.entity';



@Module({
  imports: [UsersModule,CustomerModule,EmployeeModule,SuppliersModule,CategoryModule,ProductModule,BillsModule, EmpCustModule,ProdSuppModule,CustProd,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8000,
      username: 'root',
      password: 'rootuser',
      migrations:['./src/migrations/*.ts'],
      // database: 'nest_schema1',
      database: 'db8',
      entities: [User,Customer,Employee,Supplier,Product,Category,Bill,EmpCust,ProdSupp,CustProd],
      synchronize: false,
    }),
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
