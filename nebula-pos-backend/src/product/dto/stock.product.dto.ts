import { IsNumber, Min } from "class-validator";

export class StockProductDto {
    @IsNumber()
    @Min(0)
    stock: number
}