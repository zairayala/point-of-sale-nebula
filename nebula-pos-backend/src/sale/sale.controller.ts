import { Controller, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SaleService } from './sale.service';

@Controller('sale')
@UseGuards(AuthGuard('jwt'))
export class SaleController {
    constructor (private readonly saleService: SaleService) {}

    
}
