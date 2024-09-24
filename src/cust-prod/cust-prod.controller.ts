import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CustProdService } from './cust-prod.service';
import { CreateCustProdDto } from './dto/create-cust-prod.dto';
import { UpdateCustProdDto } from './dto/update-cust-prod.dto';

@Controller('cust-prod')
export class CustProdController {
    constructor(private readonly custProdService: CustProdService) {}

    @Post()
    create(@Body() createCustProdDto: CreateCustProdDto) {
        return this.custProdService.create(createCustProdDto);
    }

    @Get()
    findAll() {
        return this.custProdService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.custProdService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateCustProdDto: UpdateCustProdDto) {
        return this.custProdService.update(+id, updateCustProdDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.custProdService.remove(+id);
    }
}

