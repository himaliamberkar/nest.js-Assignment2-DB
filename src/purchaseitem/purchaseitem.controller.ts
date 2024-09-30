import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PurchaseitemService } from './purchaseitem.service';
import { CreatePurchaseItemDto } from './dto/create-purchaseitem.dto';
// import { UpdatePurchaseitemDto } from './dto/update-purchaseitem.dto';
// 
@Controller('purchaseitem')
export class PurchaseitemController {
  constructor(private readonly purchaseitemService: PurchaseitemService) {}

  @Post()
  create(@Body() createPurchaseitemDto: CreatePurchaseItemDto) {
    return this.purchaseitemService.create(createPurchaseitemDto);
  }

  @Get()
  findAll() {
    return this.purchaseitemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.purchaseitemService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePurchaseitemDto: UpdatePurchaseitemDto) {
  //   return this.purchaseitemService.update(+id, updatePurchaseitemDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseitemService.remove(+id);
  }
}
