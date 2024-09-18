import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { Customer } from './entities/customer.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Customer]), // Register the Customer entity
    UsersModule, // Import UsersModule to access UserRepository
  ],
  providers: [CustomerService],
  controllers: [CustomerController],
})
export class CustomerModule {}
