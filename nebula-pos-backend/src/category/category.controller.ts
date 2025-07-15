import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { AuthGuard } from '@nestjs/passport';
import { ParamsIdDto } from '@/common/dto/params-id.dto';

@Controller('category')
@UseGuards(AuthGuard('jwt'))
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }

    @Get(':id')
    findAllProducts(@Param() params: ParamsIdDto) {
        return this.categoryService.findAllProducts(params.id)
    }

    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

}
