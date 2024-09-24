import { PartialType } from '@nestjs/mapped-types';
import { CreateEmpCustDto } from './create-emp-cust.dto';

export class UpdateEmpCustDto extends PartialType(CreateEmpCustDto) {}
