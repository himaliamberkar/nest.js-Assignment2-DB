// import { Injectable, NotFoundException } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { CreateBillDto } from './dto/create-bill.dto';
// import { UpdateBillDto } from './dto/update-bill.dto';
// import { Bill } from './entities/bill.entity';


// @Injectable()
// export class BillsService {
//   constructor(
//     @InjectRepository(Bill) private billRepository: Repository<Bill>,
//   ) {}

//   async findAll(): Promise<Bill[]> {
//     return this.billRepository.find();
//   }
  
  
//   // async findAllBillInfo(): Promise<Bill[]> {
//   //   return this.billRepository.find({ relations: ['user','category','product'] });
//   // }
  
//   async findOne(id: number): Promise<Bill> {
//     const bill = await this.billRepository.findOne({ where: { billId: id } });
//     if (!bill) {
//       throw new NotFoundException(`Bill with ID ${id} not found`);
//     }
//     return bill;
//   }

//   async update(id: number, updateBillDto: UpdateBillDto): Promise<Bill> {
//     const bill = await this.findOne(id);
//     Object.assign(bill, updateBillDto);
//     return this.billRepository.save(bill);
//   }

//   async remove(id: number): Promise<void> {
//     const bill = await this.findOne(id);
//     await this.billRepository.remove(bill);
//   }
// }

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, DeepPartial } from "typeorm";
import { Bill } from "./entities/bill.entity"; // Adjust import paths as necessary
import { Order } from "../order/entities/order.entity";
import { PurchaseItem } from "../purchaseitem/entities/purchaseitem.entity"; // Assuming you have this entity"; // Assuming you have this entity
import { CreateBillDto } from "./dto/create-bill.dto"; // Ensure this DTO has the necessary fields
import { CustomerService } from "../customer/customer.service"; // Assuming you have a CustomerService
import { Product } from "src/products/entities/product.entity";

@Injectable()
export class BillsService {
  constructor(
    @InjectRepository(Bill)
    private billsRepository: Repository<Bill>,

    @InjectRepository(Order)
    private orderRepository: Repository<Order>,

    @InjectRepository(PurchaseItem)
    private purchaseitemRepository: Repository<PurchaseItem>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

 // Adjust based on your services
  ) {}

  async createBill(createBillDto: CreateBillDto): Promise<any> {
    const { orderId ,custId} = createBillDto;

    // Step 1: Fetch the order with the given orderId
    const order = await this.orderRepository.findOne({
      where: { orderId  }, // Adjust based on your order ID field
    });

    // Ensure that the order exists
    if (!order) {
      throw new NotFoundException('Order not found.');
    }

    // Step 2: Extract customerId from the order
    // const customerId = order.customerId; // Assuming order has a customerId field

    // Step 3: Fetch purchase items for the provided orderId
    const orderItems = await this.purchaseitemRepository.find({
      where: { orderId },
    });

    if (orderItems.length === 0) {
      throw new NotFoundException('No items found for this order.');
    }

    let totalAmount = 0;
    const takenitems = [];

    // Step 4: Loop through the order items and calculate total amount
    for (const item of orderItems) {
      const product = await this.productRepository.findOne({
        where: { prodId : item.prodId  }, // Adjust to match your menu ID field
      });

      if (product) {
        // Calculate total amount based on price and quantity
        const itemTotal = product.price * item.quantity;
        totalAmount += itemTotal;

        // Store the menu item details
        takenitems.push({
          productName: product.pName, // Adjust based on your menu properties
          productdes: product.description, // Adjust based on your menu properties
          price: product.price,
          quantity: item.quantity,
          totalPrice: itemTotal,
        });
      }
    }

    // Step 5: Create a DeepPartial<Bill> object
    const newBill: DeepPartial<Bill> = {
      order: {  orderId }, // Assuming Order entity has an id field
      amount: totalAmount,
     // Default payment method or adjust as needed
     custId, // Ensure customerId is correctly assigned
      // createdAt: new Date(), // You can add timestamps if necessary
    };

    // Step 6: Save the bill in the database
    const savedBill = await this.billsRepository.save(newBill);

    // Return the custom object with bill details and the calculated amount
    return {
      bill: savedBill,
      takenitems,
      totalAmount,
      custId,
    };
  }

  async findAll(): Promise<Bill[]> {
    return await this.billsRepository.find({});
  }
}


