// src/products/product.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';
import { Category } from 'src/category/entities/category.entity'; // Import Category entity

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category]), // Register the Product and Category entities
  ],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
