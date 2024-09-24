import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdSupp } from './entities/prod-supp.entity';
import { ProdSuppService } from './prod-supp.service';
import { ProdSuppController } from './prod-supp.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProdSupp])],
    controllers: [ProdSuppController],
    providers: [ProdSuppService],
})
export class ProdSuppModule {}
