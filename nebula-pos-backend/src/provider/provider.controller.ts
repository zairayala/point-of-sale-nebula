import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { ProviderService } from './provider.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from '@/common/guards/roles.guard';
import { ParamsIdDto } from '@/common/dto/params-id.dto';
import { ProviderDto } from './dto/provider.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('provider')
export class ProviderController {
    constructor (private readonly providerService: ProviderService) {}
    @Get(':id')
    findAllProducts(@Param() params: ParamsIdDto){
        return this.providerService.findAllProducts(params.id)
    }

    @UseGuards(AdminGuard)
    @Post()
    async create(@Body() dto: ProviderDto){
        await this.providerService.create(dto)
        return { message: 'Brand created successfully' };
    }

    @UseGuards(AdminGuard)
    @Patch(':id')
    async update(@Param() params: ParamsIdDto ,@Body() dto: ProviderDto){
        await this.providerService.update(params.id, dto)
        return { message: 'Brand updated successfully' };
    }

    @UseGuards(AdminGuard)
    @Delete(':id')
    async delete(@Param() params: ParamsIdDto) {
        await this.providerService.delete(params.id)
        return { message: 'Brand deleted succesfully' }
    }

    @Get()
    findAll() {
        return this.providerService.findAll()
    }
    
}
