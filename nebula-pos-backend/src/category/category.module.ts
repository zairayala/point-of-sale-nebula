import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { DatabaseModule } from '@/database/database.module';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoryController],
  providers: [CategoryService, ValidationUtils]
})
export class CategoryModule { }
