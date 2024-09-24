import { IsNotEmpty, IsDate } from 'class-validator';

export class CreateBillDto {
  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  cateId: number;

  @IsNotEmpty()
  prodId: number;

  @IsDate()
  billDate: Date;
}
