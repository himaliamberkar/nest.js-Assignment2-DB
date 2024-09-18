import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployeeModule } from './employee/employee.module';
import { CustomerModule } from './customer/customer.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './products/products.module';
// import { SupplierModule } from './supplier/supplier.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { Customer } from './customer/entities/customer.entity';
import { Employee } from './employee/entities/employee.entity';
import { Product } from './products/entities/product.entity';
import { Category } from './category/entities/category.entity';


@Module({
  imports: [UsersModule,CustomerModule,EmployeeModule,CategoryModule,ProductModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 8000,
      username: 'root',
      password: 'rootuser',
      database: 'nest_schema1',
      entities: [User,Customer,Employee,Product,Category],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
