import { PartialType } from '@nestjs/mapped-types';
import { CreateCustProdDto } from './create-cust-prod.dto';

export class UpdateCustProdDto extends PartialType(CreateCustProdDto) {}
