import { Module } from '@nestjs/common';
import { SaleItemController } from './sale_item.controller';
import { SaleItemService } from './sale_item.service';

@Module({
  controllers: [SaleItemController],
  providers: [SaleItemService]
})
export class SaleItemModule {}
