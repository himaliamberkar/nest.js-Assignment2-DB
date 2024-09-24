import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustProd } from './entities/cust-prod.entity'; // Import the CustProd entity
import { CustProdService } from './cust-prod.service'; // Import the CustProd service
import { CustProdController } from './cust-prod.controller'; // Import the CustProd controller

@Module({
    imports: [TypeOrmModule.forFeature([CustProd])], // Register the CustProd entity with TypeORM
    controllers: [CustProdController], // Register the CustProd controller
    providers: [CustProdService], // Register the CustProd service
})
export class CustProdModule {}

