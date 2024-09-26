import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { Supplier } from './entities/supplier.entity';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier) private supplierRepository: Repository<Supplier>,
    private readonly dataSource: DataSource // Inject DataSource for managing transactions
  ) {}

  // Create a new supplier with a transaction
  async create(createSupplierDto: CreateSupplierDto): Promise<Supplier> {
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newSupplier = this.supplierRepository.create(createSupplierDto);
      const savedSupplier = await queryRunner.manager.save(newSupplier);

      await queryRunner.commitTransaction();
      return savedSupplier;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction in case of error
      throw error;
    } finally {
      await queryRunner.release(); // Release the query runner
    }
  }

  // Retrieve all suppliers
  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.find();
  }

  async findSupplierInfo(): Promise<Supplier[]> {
    return this.supplierRepository.find({ relations: ['user'] });
  }

  async findSupplierwithCat(): Promise<Supplier[]> {
    return this.supplierRepository.find({ relations: ['user','category'] });
  }


  // Retrieve a supplier by ID
  async findOne(suppId: number): Promise<Supplier> {
    const supplier = await this.supplierRepository.findOne({ where: { id:suppId } });
    if (!supplier) {
      throw new NotFoundException(`Supplier with ID ${suppId} not found`);
    }
    return supplier;
  }
  

  // Update a supplier by ID with a transaction
  async update(id: number, updateSupplierDto: UpdateSupplierDto): Promise<Supplier> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const supplier = await this.findOne(id);
      Object.assign(supplier, updateSupplierDto); // Merge updated data into the supplier entity

      const updatedSupplier = await queryRunner.manager.save(supplier);
      await queryRunner.commitTransaction();
      return updatedSupplier;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  // Remove a supplier by ID with a transaction
  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const supplier = await this.findOne(id);
      await queryRunner.manager.remove(supplier);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}

