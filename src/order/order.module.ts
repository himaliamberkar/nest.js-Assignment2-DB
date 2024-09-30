import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { Customer } from 'src/customer/entities/customer.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Order, Customer])],
  providers: [OrderService],
  controllers: [OrderController],
})
export class OrderModule {}

