import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import { Category } from 'src/category/entities/category.entity'; // Import Category entity

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
    @InjectRepository(Category) private categoryRepository: Repository<Category>, // Inject Category repository
  ) {}

  // Logic for creating a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    // Find the category by cateId
    const category = await this.categoryRepository.findOne({ where: { cateId: createProductDto.cateId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${createProductDto.cateId} not found`);
    }

    // Create and save the new product
    const newProduct = this.productRepository.create({
      ...createProductDto,
      category,  // Associate the Category entity
    });

    return this.productRepository.save(newProduct);
  }

  // Logic for retrieving all products
  async findAll(): Promise<Product[]> {
    return this.productRepository.find({ relations: ['category'] }); // Include the associated category
  }

  // Logic for retrieving a single product by ID
  async findOne(prodId: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { prodId }, relations: ['category'] });
    if (!product) {
      throw new NotFoundException(`Product with ID ${prodId} not found`);
    }
    return product;
  }

  // Logic for updating a product by ID
  async update(prodId: number, updateProductDto: Partial<CreateProductDto>): Promise<Product> {
    const product = await this.findOne(prodId);
    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  // Logic for deleting a product by ID
  async remove(prodId: number): Promise<void> {
    const product = await this.findOne(prodId);
    await this.productRepository.remove(product);
  }
}
