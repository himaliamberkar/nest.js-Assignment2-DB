// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import {sup}
// import { CreateSupplierDto } from './dto/create-supplier.dto';
// import { UpdateSupplierDto } from './dto/update-supplier.dto';

// @Controller('suppliers')
// export class SuppliersController {
//   constructor(private readonly suppliersService: SuppliersService) {}

//   @Post()
//   create(@Body() createSupplierDto: CreateSupplierDto) {
//     return this.suppliersService.create(createSupplierDto);
//   }

//   @Get()
//   findAll() {
//     return this.suppliersService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.suppliersService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto) {
//     return this.suppliersService.update(+id, updateSupplierDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.suppliersService.remove(+id);
//   }
// }


import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SuppliersService } from './supplier.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Controller('suppliers')
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post()
  async create(@Body() createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto);
  }

  @Get()
  async findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get('User')
  async findSupplierInfo(): Promise<Supplier[]> {
    return this.suppliersService.findSupplierInfo();
  }

  @Get('user/category')
  async findSupplierwithCat(): Promise<Supplier[]> {
    return this.suppliersService.findSupplierwithCat();
  }
  
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Supplier> {
    return this.suppliersService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    return this.suppliersService.update(+id, updateSupplierDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.suppliersService.remove(+id);
  }
}
