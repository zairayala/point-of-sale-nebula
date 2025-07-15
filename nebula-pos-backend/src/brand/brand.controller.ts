import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BrandService } from './brand.service';
import { BrandDto } from './dto/brand.dto';
import { ParamsIdDto } from '@/common/dto/params-id.dto';
import { AdminGuard } from '@/common/guards/roles.guard';

@Controller('brand')
@UseGuards(AuthGuard('jwt'))
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Get(':id')
    findAllProducts(@Param() params: ParamsIdDto){
        return this.brandService.findAllProducts(params.id)
    }

    @UseGuards(AdminGuard)
    @Post()
    async create(@Body() dto: BrandDto){
        await this.brandService.create(dto)
        return { message: 'Brand created successfully' };
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    async update(@Param() params: ParamsIdDto ,@Body() dto: BrandDto){
        await this.brandService.update(params.id, dto)
        return { message: 'Brand updated successfully' };
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    async delete(@Param() params: ParamsIdDto) {
        await this.brandService.delete(params.id)
        return { message: 'Brand deleted succesfully' }
    }

    @Get()
    findAll() {
        return this.brandService.findAll()
    }

}
