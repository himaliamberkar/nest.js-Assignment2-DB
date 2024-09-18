// src/products/dto/create-product.dto.ts
export class CreateProductDto {
    pName: string;          // Name of the product
    description: string;    // Description of the product
    stockQuantity: number;  // Stock quantity
    price: number;          // Price of the product
    cateId: number;         // Category ID as a foreign key
  }
  
