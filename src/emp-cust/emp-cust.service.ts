// src/emp-cust/emp-cust.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmpCustDto } from './dto/create-emp-cust.dto';
import { EmpCust } from './entities/emp-cust.entity';
import { Employee } from 'src/employee/entities/employee.entity';
import { Customer } from 'src/customer/entities/customer.entity';


@Injectable()
export class EmpCustService {
  constructor(
    @InjectRepository(EmpCust) private empCustRepository: Repository<EmpCust>,
    @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
    @InjectRepository(Customer) private customerRepository: Repository<Customer>,
  ) {}

  // Logic for creating a new EmpCust record
  async create(createEmpCustDto: CreateEmpCustDto): Promise<EmpCust> {
    // Find the employee by empId
    const employee = await this.employeeRepository.findOne({
      where: { id: createEmpCustDto.empId }, // Use options object
    });
    if (!employee) {
      throw new NotFoundException(`Employee with ID ${createEmpCustDto.empId} not found`);
    }

    // Find the customer by custId
    const customer = await this.customerRepository.findOne({
      where: { id: createEmpCustDto.custId }, // Use options object
    });
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${createEmpCustDto.custId} not found`);
    }

    // Create and save the new EmpCust record
    const empCust = this.empCustRepository.create({
      employee, // Associate the Employee entity
      customer,  // Associate the Customer entity
    });

    return this.empCustRepository.save(empCust);
  }

  // Logic for retrieving all EmpCust records
  async findAll(): Promise<EmpCust[]> {
    return this.empCustRepository.find({ relations: ['employee', 'customer'] }); // Include relations
  }

  // Logic for retrieving a single EmpCust record by ID
  async findOne(id: number): Promise<EmpCust> {
    const empCust = await this.empCustRepository.findOne({
      where: { empCustId: id },
      relations: ['employee', 'customer'], // Include relations
    });
    if (!empCust) {
      throw new NotFoundException(`EmpCust record with ID ${id} not found`);
    }
    return empCust;
  }

  // Logic for deleting an EmpCust record by ID
  async remove(id: number): Promise<void> {
    const empCust = await this.findOne(id); // Ensure it exists
    await this.empCustRepository.remove(empCust);
  }
}

