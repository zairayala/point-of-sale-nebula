import { Type } from "class-transformer"
import { IsArray, IsIn, IsISO8601, IsNotEmpty, IsNumber, IsString, IsUUID, Min, Validate, ValidateIf, ValidateNested } from "class-validator"

export class SaleItemDto {
    @IsUUID()
    @IsNotEmpty()
    product_id: string

    @IsNumber()
    @Min(0)
    quantity: number
}

export class SaleDto {
    @IsString()
    @IsIn(['cash', 'card', 'transfer', 'wallet', 'other'])
    payment_method: string

    @IsArray()
    @ValidateNested({each: true})
    @Type(() => SaleItemDto)
    items: SaleItemDto[]
}

export class SaleReportByDateRange {
    @IsISO8601()
    from: string

    @IsISO8601()
    to: string
}