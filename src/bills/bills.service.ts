import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { Bill } from './entities/bill.entity';

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill) private billRepository: Repository<Bill>,
  ) {}

  async create(createBillDto: CreateBillDto): Promise<Bill> {
    const bill = this.billRepository.create(createBillDto);
    return this.billRepository.save(bill);
  }

  async findAll(): Promise<Bill[]> {
    return this.billRepository.find();
  }

  async findOne(id: number): Promise<Bill> {
    const bill = await this.billRepository.findOne({ where: { billId: id } });
    if (!bill) {
      throw new NotFoundException(`Bill with ID ${id} not found`);
    }
    return bill;
  }

  async update(id: number, updateBillDto: UpdateBillDto): Promise<Bill> {
    const bill = await this.findOne(id);
    Object.assign(bill, updateBillDto);
    return this.billRepository.save(bill);
  }

  async remove(id: number): Promise<void> {
    const bill = await this.findOne(id);
    await this.billRepository.remove(bill);
  }
}
