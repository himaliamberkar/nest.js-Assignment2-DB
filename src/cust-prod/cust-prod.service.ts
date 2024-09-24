import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustProd } from './entities/cust-prod.entity';
import { CreateCustProdDto } from './dto/create-cust-prod.dto';
import { UpdateCustProdDto } from './dto/update-cust-prod.dto';

@Injectable()
export class CustProdService {
    constructor(
        @InjectRepository(CustProd)
        private readonly custProdRepository: Repository<CustProd>,
    ) {}

    async create(createCustProdDto: CreateCustProdDto): Promise<CustProd> {
        const custProd = this.custProdRepository.create(createCustProdDto);
        return this.custProdRepository.save(custProd);
    }

    async findAll(): Promise<CustProd[]> {
        return this.custProdRepository.find();
    }

    async findOne(id: number): Promise<CustProd> {
        return this.custProdRepository.findOne({ where: { cust_prod_id: id } });
    }

    async update(id: number, updateCustProdDto: UpdateCustProdDto): Promise<CustProd> {
        await this.custProdRepository.update(id, updateCustProdDto);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.custProdRepository.delete(id);
    }
}
