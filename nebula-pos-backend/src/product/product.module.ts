import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { DatabaseModule } from '@/database/database.module';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService, ValidationUtils],
  controllers: [ProductController]
})
export class ProductModule {}
