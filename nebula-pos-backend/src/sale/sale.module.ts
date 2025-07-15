import { Module } from '@nestjs/common';
import { SaleController } from './sale.controller';
import { SaleService } from './sale.service';
import { ValidationUtils } from '@/common/validators/validation.utils';
import { DatabaseModule } from '@/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [SaleController],
  providers: [SaleService, ValidationUtils]
})
export class SaleModule {}
