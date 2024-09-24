// src/employees/employee.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { UsersModule } from '../users/users.module'; // Import UsersModule to access UserRepository
import { EmpCust } from 'src/emp-cust/entities/emp-cust.entity';
import { User } from 'src/users/entities/user.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]), // Register the Employee entity
    UsersModule, // Import UsersModule to access UserRepository
  ],
  providers: [EmployeeService],
  controllers: [EmployeeController],
})
export class EmployeeModule {}
