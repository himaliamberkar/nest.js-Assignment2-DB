import { Module } from '@nestjs/common';
import { PurchaseitemService } from './purchaseitem.service';
import { PurchaseitemController } from './purchaseitem.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseItem } from './entities/purchaseitem.entity';

@Module({
  imports :[TypeOrmModule.forFeature([PurchaseItem])],
  controllers: [PurchaseitemController],
  providers: [PurchaseitemService],
})
export class PurchaseitemModule {}
