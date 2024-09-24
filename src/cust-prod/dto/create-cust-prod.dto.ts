import { IsNotEmpty } from 'class-validator';

export class CreateCustProdDto {
    @IsNotEmpty()
    custId: number;

    @IsNotEmpty()
    prodId: number;
}

