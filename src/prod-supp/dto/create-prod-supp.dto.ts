import { IsNotEmpty } from 'class-validator';

export class CreateProdSuppDto {
    @IsNotEmpty()
    prodId: number;

    @IsNotEmpty()
    suppId: number;
}

