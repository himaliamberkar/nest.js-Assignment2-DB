import { IsNotEmpty,IsInt } from "class-validator";

export class CreateBillDto {
  @IsNotEmpty()
  @IsInt()
  custId: number; // Customer ID

  @IsNotEmpty()
  @IsInt()
  orderId: number; // Order ID
}
