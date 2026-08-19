import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import type { StringValue } from 'ms';

import { FindUserByEmailUseCase } from '../../../users/application/use-cases/find-user-by-email.use-case';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../../domain/jwt-payload.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async execute(dto: LoginDto) {
    const user = await this.findUserByEmail.execute(dto.email);

    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const passwordMatches = await bcrypt.compare(
      dto.password + this.config.getOrThrow<string>('PEPPER'),
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload: JwtPayload = {
      sub: user.id,
      role: user.role,
    };

    const accessExpiresIn = this.config.getOrThrow<string>(
      'JWT_ACCESS_EXPIRES_IN',
    ) as StringValue;

    const refreshExpiresIn = this.config.getOrThrow<string>(
      'JWT_REFRESH_EXPIRES_IN',
    ) as StringValue;

    const accessToken = await this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: accessExpiresIn,
    });

    const refreshToken = await this.jwtService.signAsync(payload, {
      secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: refreshExpiresIn,
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}
