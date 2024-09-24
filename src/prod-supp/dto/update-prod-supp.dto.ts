import { PartialType } from '@nestjs/mapped-types';
import { CreateProdSuppDto } from './create-prod-supp.dto';

export class UpdateProdSuppDto extends PartialType(CreateProdSuppDto) {}
