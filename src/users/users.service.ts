// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateUserDto } from './dto/create-user.dto';
// import { UpdateUserDto } from './dto/update-user.dto';
// import { User } from './entities/user.entity'; // Assuming User entity exists

// @Injectable()
// export class UsersService {
//   constructor(
//     @InjectRepository(User) private userRepository: Repository<User>, // Inject TypeORM repository
//   ) {}

//   // Logic for creating a new user
//   async create(createUserDto: CreateUserDto): Promise<User> {
//     const newUser = this.userRepository.create(createUserDto); // Create a new user instance
//     return this.userRepository.save(newUser); // Save the new user to the database
//   }

//   // Logic for retrieving all users
//   async findAll(): Promise<User[]> {
//     return this.userRepository.find(); // Fetch all users from the database
//   }

//   // Logic for retrieving a user by ID
//   async findOne(id: number): Promise<User> {
//     const user = await this.userRepository.findOne({ where: { id } }); // Find user by primary key
//     if (!user) {
//       throw new NotFoundException(`User with ID ${id} not found`); // Throw error if user not found
//     }
//     return user;
//   }

//   // Logic for updating a user by ID
//   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
//     const user = await this.findOne(id); // First, find the user
//     Object.assign(user, updateUserDto); // Merge updated data into the user entity
//     return this.userRepository.save(user); // Save the updated user to the database
//   }

//   // Logic for deleting a user by ID
//   async remove(id: number): Promise<void> {
//     const user = await this.findOne(id); // First, find the user
//     await this.userRepository.remove(user); // Delete the user from the database
//   }
// }


import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity'; 

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>, // Inject TypeORM repository
    private readonly dataSource: DataSource // Inject DataSource for managing transactions
  ) {}

  // Logic for creating a new user with a transaction
  async create(createUserDto: CreateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const newUser = this.userRepository.create(createUserDto); // Create a new user instance
      const savedUser = await queryRunner.manager.save(newUser); // Save user with transaction

      await queryRunner.commitTransaction();
      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction in case of error
      throw error;
    } finally {
      await queryRunner.release(); // Release the query runner
    }
  }

  // Logic for retrieving all users
  async findAll(): Promise<User[]> {
    return this.userRepository.find(); // Fetch all users from the database
  }

  // Logic for retrieving a user by ID
  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } }); // Find user by primary key
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`); // Throw error if user not found
    }
    return user;
  }

  // Logic for updating a user by ID with a transaction
  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.findOne(id); // First, find the user
      Object.assign(user, updateUserDto); // Merge updated data into the user entity

      const updatedUser = await queryRunner.manager.save(user); // Save the updated user with transaction
      await queryRunner.commitTransaction();
      return updatedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction in case of error
      throw error;
    } finally {
      await queryRunner.release(); // Release the query runner
    }
  }

  // Logic for deleting a user by ID with a transaction
  async remove(id: number): Promise<void> {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const user = await this.findOne(id); // First, find the user
      await queryRunner.manager.remove(user); // Remove the user with transaction

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction(); // Rollback transaction in case of error
      throw error;
    } finally {
      await queryRunner.release(); // Release the query runner
    }
  }
}

