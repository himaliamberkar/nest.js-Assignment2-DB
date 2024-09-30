import { Module } from '@nestjs/common';
import { BillsService } from './bills.service';
import { BillsController } from './bills.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bill } from './entities/bill.entity';
import { Order } from 'src/order/entities/order.entity';
import { PurchaseItem } from 'src/purchaseitem/entities/purchaseitem.entity';
import { Product } from 'src/products/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bill,Order,PurchaseItem,Product])],
  controllers: [BillsController],
  providers: [BillsService],
})
export class BillsModule {}
