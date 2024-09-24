// src/emp-cust/emp-cust.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmpCust } from './entities/emp-cust.entity';
import { EmpCustService } from './emp-cust.service';
import { EmpCustController } from './emp-cust.controller';
import { Employee } from 'src/employee/entities/employee.entity';
import { Customer } from 'src/customer/entities/customer.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([EmpCust, Employee, Customer]), // Register the EmpCust, Employee, and Customer entities
  ],
  providers: [EmpCustService],
  controllers: [EmpCustController],
})
export class EmpCustModule {}

