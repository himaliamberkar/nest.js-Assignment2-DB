// src/employees/employee.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { Employee } from './entities/employee.entity';
import { User } from '../users/entities/user.entity'; // Import User entity

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(User) private userRepository: Repository<User>, // Inject User repository
  ) {}

  // Logic for creating a new employee
  async create(createEmployeeDto: CreateEmployeeDto): Promise<Employee> {
    // Find the user by userId
    const user = await this.userRepository.findOne({ where: { id: createEmployeeDto.userId } });
    if (!user) {
      throw new NotFoundException(`User with ID ${createEmployeeDto.userId} not found`);
    }

    // Create and save the new employee
    const newEmployee = this.employeeRepository.create({
      user, // Associate the User entity
      salary: createEmployeeDto.salary,
    });

    return this.employeeRepository.save(newEmployee);
  }

  // Logic for retrieving all employees
  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find({ relations: ['user'] }); // Include the associated user
  }

  // Logic for retrieving a single employee by ID
  async findOne(id: number): Promise<Employee> {
    const employee = await this.employeeRepository.findOne({ where: { id }, relations: ['user'] });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  // Logic for deleting an employee by ID
  async remove(id: number): Promise<void> {
    const employee = await this.findOne(id);
    await this.employeeRepository.remove(employee);
  }
}
