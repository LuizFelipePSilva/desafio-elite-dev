import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { FindUserByEmailUseCase } from '../../../users/application/use-cases/find-user-by-email.use-case';
import { LoginDto } from '../dto/login.dto';
import { JwtPayload } from '../../domain/jwt-payload.interface';

@Injectable()
export class LoginUseCase {
  constructor(
    private readonly findUserByEmail: FindUserByEmailUseCase,
    private readonly jwtService: JwtService,
  ) {}

  async execute(dto: LoginDto): Promise<{ message: string }> {
    const user = await this.findUserByEmail.execute(dto.email);
    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const passwordMatches = await bcrypt.compare(
      dto.password + process.env.PEPPER,
      user.password,
    );
    if (!passwordMatches)
      throw new UnauthorizedException('Credenciais inválidas');

    const payload: JwtPayload = { sub: user.id, role: user.role };
    await this.jwtService.signAsync(payload);
    return { message: 'Login efetuado com sucesso' };
  }
}
