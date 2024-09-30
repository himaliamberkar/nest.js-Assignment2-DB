import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './products/products.module';
import { BillsModule } from './bills/bills.module';
import { SuppliersModule } from './supplier/supplier.module';
// import { EmpCustModule } from './emp-cust/emp-cust.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Employee } from './employee/entities/employee.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './category/entities/category.entity';
import { Bill } from './bills/entities/bill.entity';
import { Supplier } from './supplier/entities/supplier.entity';
// import { EmpCust } from './emp-cust/entities/emp-cust.entity';
import { ProdSuppModule } from './prod-supp/prod-supp.module';
import { CustProdModule } from './cust-prod/cust-prod.module';
import { ProdSupp } from './prod-supp/entities/prod-supp.entity';
import { CustProd } from './cust-prod/entities/cust-prod.entity';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { AuthModule } from './authentication/auth.module';
import { OrderModule } from './order/order.module';
import { PurchaseitemModule } from './purchaseitem/purchaseitem.module';
import { Order } from './order/entities/order.entity';
import { PurchaseItem } from './purchaseitem/entities/purchaseitem.entity';


@Module({
  imports: [UsersModule,CustomerModule,EmployeeModule,SuppliersModule,CategoryModule,ProductModule,BillsModule,ProdSuppModule,CustProdModule,AuthModule,OrderModule,PurchaseitemModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8000,
      username: 'root',
      password: 'rootuser',
      // migrations:['./src/migrations/*.ts'],
      database: 'new_schema12345',
      entities: [User,Customer,Employee,Supplier,Product,Category,Bill,ProdSupp,CustProd,Order,PurchaseItem],
      synchronize: true,
    }),
    


  ],
  controllers: [],
  providers: [],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes();
}
}
