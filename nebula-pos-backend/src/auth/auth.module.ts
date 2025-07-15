import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { DatabaseModule } from '@/database/database.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../common/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { ValidationUtils } from '@/common/validators/validation.utils';
import { AdminGuard } from '@/common/guards/roles.guard';

@Module({
  imports: [ //solo para modulos
    DatabaseModule,
    PassportModule,
    JwtModule.register({ //registra y configura modulo de jwt
      secret: 'secret_key',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, ValidationUtils, AdminGuard], //para servicios, estrategias, funcionalidades...
  exports: [JwtModule]
})
export class AuthModule {}
