import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProductService } from './product.service';
import { ProductDto } from './dto/product.dto';
import { StockProductDto } from './dto/stock.product.dto';
import { AdminGuard } from '@/common/guards/roles.guard';

@Controller('product')
@UseGuards(AuthGuard('jwt'))
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get(':barcode')
    findOne(@Param('barcode') barcode: string) {
        return this.productService.findOne(barcode)
    }

    @UseGuards(AdminGuard)
    @Post()
    async create(@Body() dto: ProductDto) {
        await this.productService.create(dto)
        return { message: 'Product created succesfully' }
    }

    @UseGuards(AdminGuard)
    @Patch(':barcode')
    async update(@Param('barcode') barcodeParam: string, @Body() dto: ProductDto) {
        await this.productService.update(barcodeParam, dto)
        return { message: 'Product updated succesfully' }
    }

    @Patch(':barcode/stock')
    async updateStock(@Param('barcode') barcodeParam: string, @Body() dto: StockProductDto) {
        await this.productService.updateStock(barcodeParam, dto.stock)
        return { message: 'Stock product updated succesfully' }
    }

    @UseGuards(AdminGuard)
    @Patch(':barcode/active')
    async toggleActive(@Param('barcode') barcodeParam: string){
        await this.productService.toggleActive(barcodeParam)
        return { message: 'Product updated succesfully' }
    }

    @UseGuards(AdminGuard)
    @Delete(':barcode')
    async delete(@Param('barcode') barcode: string) {
        await this.productService.delete(barcode)
        return { message: 'Product deleted succesfully' }
    }

    @Get()
    findAll() {
        return this.productService.findAll()
    }
}
