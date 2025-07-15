import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { ProductModule } from './product/product.module';
import { BrandModule } from './brand/brand.module';
import { CategoryModule } from './category/category.module';
import { UserModule } from './user/user.module';
import { ProviderModule } from './provider/provider.module';
import { SaleModule } from './sale/sale.module';
import { SaleItemModule } from './sale_item/sale_item.module';

@Module({
  imports: [AuthModule, DatabaseModule, ProductModule, BrandModule, CategoryModule, UserModule, ProviderModule, SaleModule, SaleItemModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
