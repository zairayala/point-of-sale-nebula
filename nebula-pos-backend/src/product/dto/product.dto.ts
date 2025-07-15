import { IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, Length, Min } from "class-validator"

export class ProductDto {
    @IsString()
    @IsNotEmpty()
    @Length(3, 35)
    name: string

    @IsString()
    @IsNotEmpty()
    barcode: string

    @IsNumber()
    @Min(0)
    price: number

    @IsNumber()
    @Min(0)
    purchase_price: number

    @IsUUID()
    @IsNotEmpty()
    category_id: string

    @IsUUID()
    @IsNotEmpty()
    brand_id: string

    @IsNumber()
    @Min(0)
    stock: number

    @IsString()
    @IsIn(['unidad', 'kg', 'grms', 'n/a'])
    unit: string

    @IsNumber()
    @IsOptional()
    @Min(0)
    min_stock?: number

    @IsUUID()
    @IsOptional()
    provider_id?: string
}