import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category) private categoryRepository: Repository<Category>,
  ) {}

  // Logic for creating a new category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(newCategory);
  }

  // Logic for retrieving all categories
  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  // Logic for retrieving a single category by ID
  async findOne(cateId: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { cateId } });
    if (!category) {
      throw new NotFoundException(`Category with ID ${cateId} not found`);
    }
    return category;
  }

  // Logic for updating a category by ID
  async update(cateId: number, updateCategoryDto: Partial<CreateCategoryDto>): Promise<Category> {
    const category = await this.findOne(cateId);
    Object.assign(category, updateCategoryDto);
    return this.categoryRepository.save(category);
  }

  // Logic for deleting a category by ID
  async remove(cateId: number): Promise<void> {
    const category = await this.findOne(cateId);
    await this.categoryRepository.remove(category);
  }
}
