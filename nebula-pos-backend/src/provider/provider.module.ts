import { Module } from '@nestjs/common';
import { ProviderController } from './provider.controller';
import { ProviderService } from './provider.service';
import { DatabaseModule } from '@/database/database.module';
import { ValidationUtils } from '@/common/validators/validation.utils';

@Module({
  imports: [DatabaseModule],
  controllers: [ProviderController],
  providers: [ProviderService, ValidationUtils]
})
export class ProviderModule {}
