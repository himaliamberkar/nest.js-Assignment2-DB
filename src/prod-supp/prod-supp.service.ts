import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProdSupp } from './entities/prod-supp.entity';
import { CreateProdSuppDto } from './dto/create-prod-supp.dto';
import { UpdateProdSuppDto } from './dto/update-prod-supp.dto';
@Injectable()
export class ProdSuppService {
    constructor(
        @InjectRepository(ProdSupp)
        private prodSuppRepository: Repository<ProdSupp>,
    ) {}

    async create(data: CreateProdSuppDto): Promise<ProdSupp> {
        const prodSupp = this.prodSuppRepository.create(data);
        return this.prodSuppRepository.save(prodSupp);
    }

    async findAll(): Promise<ProdSupp[]> {
        return this.prodSuppRepository.find({ relations: ['product', 'supplier'] });
    }

    async findOne(id: number): Promise<ProdSupp> {
        return this.prodSuppRepository.findOne({ where: { id }, relations: ['product', 'supplier'] });
    }

    async update(id: number, updateData: UpdateProdSuppDto): Promise<ProdSupp> {
        await this.prodSuppRepository.update(id, updateData);
        return this.findOne(id);
    }

    async remove(id: number): Promise<void> {
        await this.prodSuppRepository.delete(id);
    }
}
