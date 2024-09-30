import { IsNotEmpty } from "class-validator";

export class CreateOrderDto {
    @IsNotEmpty()
    custId: number  // Foreign key referencing the customer
  }
  
