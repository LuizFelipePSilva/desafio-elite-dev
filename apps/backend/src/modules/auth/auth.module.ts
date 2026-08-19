import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from '../users/users.module';
import { AuthController } from './infrastructure/auth.controller';
import { LoginUseCase } from './application/use-cases/login.use-case';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [LoginUseCase, JwtStrategy],
})
export class AuthModule {}
