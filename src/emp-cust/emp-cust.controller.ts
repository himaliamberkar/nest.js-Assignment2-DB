// src/emp-cust/emp-cust.controller.ts
import { Controller, Post, Body, Get, Param, Delete } from '@nestjs/common';
import { EmpCustService } from './emp-cust.service';
import { CreateEmpCustDto } from './dto/create-emp-cust.dto';

@Controller('emp-cust')
export class EmpCustController {
  constructor(private readonly empCustService: EmpCustService) {}

  // Create a new EmpCust record
  @Post()
  create(@Body() createEmpCustDto: CreateEmpCustDto) {
    return this.empCustService.create(createEmpCustDto);
  }

  // Retrieve all EmpCust records
  @Get()
  findAll() {
    return this.empCustService.findAll();
  }

  // Retrieve a single EmpCust record by ID
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.empCustService.findOne(+id);
  }

  // Delete an EmpCust record by ID
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.empCustService.remove(+id);
  }
}

