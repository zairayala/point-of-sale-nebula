import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { DatabaseModule } from '@/database/database.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    PassportModule,
    AuthModule //esto permite no importar nada o un provider que no tenga authmodule
  ],
  controllers: [UserController],
  providers: [UserService]
})
export class UserModule {}
