import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdSuppService } from './prod-supp.service';
import { CreateProdSuppDto } from './dto/create-prod-supp.dto';
import { UpdateProdSuppDto } from './dto/update-prod-supp.dto';
@Controller('prod-supp')
export class ProdSuppController {
    constructor(private readonly prodSuppService: ProdSuppService) {}

    @Post()
    create(@Body() createProdSuppDto: CreateProdSuppDto) {
        return this.prodSuppService.create(createProdSuppDto);
    }

    @Get()
    findAll() {
        return this.prodSuppService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.prodSuppService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateProdSuppDto: UpdateProdSuppDto) {
        return this.prodSuppService.update(+id, updateProdSuppDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.prodSuppService.remove(+id);
    }
}
