

import { Injectable, NotFoundException, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, QueryRunner, DataSource } from 'typeorm'; // Import QueryRunner and DataSource
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; // Assuming User entity exists
import { PaginationSearchSortService } from 'src/genericPaginationSearchSortService';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  private readonly paginationService: PaginationSearchSortService<User>;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Inject TypeORM repository
    private dataSource: DataSource, // Inject DataSource for QueryRunner
  ) {
    this.paginationService = new PaginationSearchSortService(this.userRepository);
  }

  // Logic for creating a new user with a transaction
  async create(createUserDto: CreateUserDto): Promise<User> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect(); // Establish a connection
    await queryRunner.startTransaction(); // Start the transaction

    try {
      const newUser = this.userRepository.create(createUserDto);
      newUser.password = bcrypt.hashSync(newUser.password, 10); // Hash the password

      const savedUser = await queryRunner.manager.save(newUser); // Save user using QueryRunner
      await queryRunner.commitTransaction(); // Commit transaction
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction in case of an error
      throw new InternalServerErrorException('Error creating user');
    } finally {
      await queryRunner.release(); // Release the QueryRunner when done
    }
  }

  // Logic for retrieving all users (no transaction needed)
  async findAll(
    page: number = 1,
    limit: number = 10,
    search: string = '',
    sortField: string = 'id',
    sortOrder: 'ASC' | 'DESC' = 'ASC'
  ): Promise<{ data: User[]; total: number }> {
    return this.paginationService.findAll(page, limit, search, sortField, sortOrder);
  }

  // Logic for retrieving a user by ID (no transaction needed)
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  // Logic for updating a user with a transaction
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.findOne(id); // First, find the user
      Object.assign(user, updateUserDto); // Merge updated data into the user entity

      const updatedUser = await queryRunner.manager.save(user); // Save user using QueryRunner
      await queryRunner.commitTransaction(); // Commit transaction
      return updatedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction on error
      throw new InternalServerErrorException('Error updating user');
    } finally {
      await queryRunner.release(); // Release QueryRunner
    }
  }

  // Logic for deleting a user with a transaction
  async remove(id: number): Promise<void> {
    const queryRunner: QueryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.findOne(id); // First, find the user

      await queryRunner.manager.remove(user); // Remove user using QueryRunner
      await queryRunner.commitTransaction(); // Commit transaction
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction on error
      throw new InternalServerErrorException('Error deleting user');
    } finally {
      await queryRunner.release(); // Release QueryRunner
    }
  }

  // Logic for finding a user by email (no transaction needed)
  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // Logic for validating a user (no transaction needed)
  async validateUser(email: string, password: string): Promise<any> {
    const entity = await this.findOneByEmail(email);
    if (entity && bcrypt.compareSync(password, entity.password)) {
      const { password, ...result } = entity;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }
}



















