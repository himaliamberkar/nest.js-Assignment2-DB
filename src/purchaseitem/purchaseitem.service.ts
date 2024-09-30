import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseItemDto } from './dto/create-purchaseitem.dto';
import { PurchaseItem } from './entities/purchaseitem.entity';
// import { UpdatePurchaseitemDto } from './dto/update-purchaseitem.dto';
// Assuming the Purchaseitem entity is correctly defined

@Injectable()
export class PurchaseitemService {
  constructor(
    @InjectRepository(PurchaseItem) // Injecting the repository for Purchaseitem
private purchaseitemRepository: Repository<PurchaseItem>,

  ) {}

  // Logic to add a new purchase item
  async create(createPurchaseitemDto: CreatePurchaseItemDto): Promise<PurchaseItem> {
    const newPurchaseitem = this.purchaseitemRepository.create(createPurchaseitemDto);
    return this.purchaseitemRepository.save(newPurchaseitem);
  }

  // Logic to retrieve all purchase items
  async findAll(): Promise<PurchaseItem[]> {
    return this.purchaseitemRepository.find();
  }

  // Logic to retrieve a purchase item by ID
  async findOne(id: number): Promise<PurchaseItem> {
    const purchaseitem = await this.purchaseitemRepository.findOne({ where: { id } });
    if (!purchaseitem) {
      throw new NotFoundException(`Purchase item with ID ${id} not found`);
    }
    return purchaseitem;
  }

  // Logic to update a purchase item by ID
  // async update(id: number, updatePurchaseitemDto: UpdatePurchaseitemDto): Promise<PurchaseItem> {
  //   const purchaseitem = await this.findOne(id);
  //   Object.assign(purchaseitem, updatePurchaseitemDto);
  //   return this.purchaseitemRepository.save(purchaseitem);
  // }

  // Logic to delete a purchase item by ID
  async remove(id: number): Promise<void> {
    const purchaseitem = await this.findOne(id);
    await this.purchaseitemRepository.remove(purchaseitem);
  }
}
