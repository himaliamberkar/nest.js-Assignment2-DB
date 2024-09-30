import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePurchaseItemDto {
  @IsNotEmpty()
  @IsNumber()
  orderId: number;

  @IsNotEmpty()
  @IsNumber()
  prodId: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}
