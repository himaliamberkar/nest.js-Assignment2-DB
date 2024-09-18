// src/products/product.controller.ts
import { Controller, Post, Body, Get, Param, Delete, Patch } from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // Create a new product
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  // Retrieve all products
  @Get()
  findAll() {
    return this.productService.findAll();
  }

  // Retrieve a product by ID
  @Get(':id')
  findOne(@Param('id') prodId: string) {
    return this.productService.findOne(+prodId);
  }

  // Update a product by ID
  @Patch(':id')
  update(@Param('id') prodId: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+prodId, updateProductDto);
  }

  // Delete a product by ID
  @Delete(':id')
  remove(@Param('id') prodId: string) {
    return this.productService.remove(+prodId);
  }
}
