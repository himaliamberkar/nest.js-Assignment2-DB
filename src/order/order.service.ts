// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from './entities/order.entity';
// import { CreateOrderDto } from './dto/create-order.dto';
// import { Customer } from 'src/customer/entities/customer.entity';

// @Injectable()
// export class OrderService {
//   constructor(
//     @InjectRepository(Order) private orderRepository: Repository<Order>,
//     @InjectRepository(Customer) private customerRepository: Repository<Customer>,
//   ) {}

//   async create(createOrderDto: CreateOrderDto): Promise<Order> {

//     const newOrder = this.orderRepository.create({ customer });
//     return this.orderRepository.save(newOrder);
//   }

//   async findAll(): Promise<Order[]> {
//     return this.orderRepository.find({ relations: ['customer'] });
//   }

//   async findOne(orderId: number): Promise<Order> {
//     const order = await this.orderRepository.findOne({where: {orderId},  relations: ['customer'] });
//     if (!order) {
//       throw new NotFoundException(`Order with ID ${orderId} not found`);
//     }
//     return order;
//   }

//   async remove(orderId: number): Promise<void> {
//     const order = await this.findOne(orderId);
//     await this.orderRepository.remove(order);
//   }
// }



import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ) {}

  // Create a new order associated with a customer
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    // Find the customer using the custId provided in the DTO
    const customer = await this.customerRepository.findOne({
      where: { id: createOrderDto.custId },
    });

    // If no customer is found, throw an error
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createOrderDto.custId} not found`);
    }

    // Create a new order and associate it with the found customer
    const newOrder = this.orderRepository.create({ customer });

    // Save the order to the database
    return this.orderRepository.save(newOrder);
  }

  // Retrieve all orders with their associated customer
  async findAll(): Promise<Order[]> {
    // Fetch all orders, including related customer data
    return this.orderRepository.find({ relations: ['customer'] });
  }

  // Find a specific order by its ID, including the customer details
  async findOne(orderId: number): Promise<Order> {
    // Fetch the order by orderId and include customer information
    const order = await this.orderRepository.findOne({
      where: { orderId },
      relations: ['customer'],
    });

    // If the order is not found, throw an error
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return order;
  }

  // Remove an order by its ID
  async remove(orderId: number): Promise<void> {
    // Fetch the order to ensure it exists before deletion
    const order = await this.findOne(orderId);

    // Remove the order from the database
    await this.orderRepository.remove(order);
  }
}
