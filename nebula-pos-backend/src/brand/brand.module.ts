import { Module } from '@nestjs/common';
import { BrandService } from './brand.service';
import { BrandController } from './brand.controller';
import { DatabaseModule } from '@/database/database.module';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Module({
  imports: [DatabaseModule],
  providers: [BrandService, ValidationUtils],
  controllers: [BrandController]
})
export class BrandModule {}
