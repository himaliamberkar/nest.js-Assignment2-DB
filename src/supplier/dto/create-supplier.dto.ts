import { IsNotEmpty } from 'class-validator';

export class CreateSupplierDto {
    @IsNotEmpty()
    userId: number;

    @IsNotEmpty()
    cateId: number;

    @IsNotEmpty()
    prodId: number;

    @IsNotEmpty()
    quantity: number;
}
