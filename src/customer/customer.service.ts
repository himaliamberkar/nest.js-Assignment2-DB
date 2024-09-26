// src/customers/customer.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Customer } from './entities/customer.entity';
import { User } from '../users/entities/user.entity'; // Import User entity

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
    @InjectRepository(User) private userRepository: Repository<User>, // Inject User repository
  ) {}

  // Logic for creating a new customer
  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    // Find the user by userId
    const user = await this.userRepository.findOne({ where: { id: createCustomerDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createCustomerDto.userId} not found`);
    }

    // Create and save the new customer
    const newCustomer = this.customerRepository.create({
      user, // Associate the User entity directly
    });

    return this.customerRepository.save(newCustomer);
  }

  // Logic for retrieving all customers
  async findAll(): Promise<Customer[]> {
    return this.customerRepository.find(); // Include the associated user
  }

  async findCustomerINfo(): Promise<Customer[]> {
    return this.customerRepository.find({ relations: ['user'] }); // Include the associated user
  }

  // Logic for retrieving a single customer by ID
  async findOne(id: number): Promise<Customer> {
    const customer = await this.customerRepository.findOne({ where: { id }, relations: ['user'] });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
    return customer;
  }

  // Logic for deleting a customer by ID
  async remove(id: number): Promise<void> {
    const customer = await this.findOne(id);
    await this.customerRepository.remove(customer);
  }
}
