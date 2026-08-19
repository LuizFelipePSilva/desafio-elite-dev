import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { LoginUseCase } from './login.use-case';
import { FindUserByEmailUseCase } from '../../../users/application/use-cases/find-user-by-email.use-case';
import { JwtService } from '@nestjs/jwt';
import { UserRole } from '../../../users/domain/entities/user.entity';

describe('LoginUseCase', () => {
  let useCase: LoginUseCase;
  let findUserByEmail: jest.Mocked<FindUserByEmailUseCase>;
  let jwtService: jest.Mocked<JwtService>;

  const user = {
    id: 'uuid',
    name: 'John',
    email: 'john@example.com',
    password: '',
    role: UserRole.CUSTOMER,
  };

  beforeEach(async () => {
    process.env.PEPPER = 'test-pepper';
    user.password = await bcrypt.hash('123456' + process.env.PEPPER, 12);

    findUserByEmail = {
      execute: jest.fn(),
    } as unknown as jest.Mocked<FindUserByEmailUseCase>;
    jwtService = { signAsync: jest.fn() } as unknown as jest.Mocked<JwtService>;
    useCase = new LoginUseCase(findUserByEmail, jwtService);
  });

  it('returns an access token for valid credentials', async () => {
    findUserByEmail.execute.mockResolvedValue(user);
    jwtService.signAsync.mockResolvedValue('signed-token');

    const result = await useCase.execute({
      email: user.email,
      password: '123456',
    });

    expect(jwtService.signAsync).toHaveBeenCalledWith({
      sub: user.id,
      role: user.role,
    });
    expect(result).toEqual({ accessToken: 'signed-token' });
  });

  it('throws UnauthorizedException when user does not exist', async () => {
    findUserByEmail.execute.mockResolvedValue(null);

    await expect(
      useCase.execute({ email: 'missing@example.com', password: '123456' }),
    ).rejects.toThrow(UnauthorizedException);
  });

  it('throws UnauthorizedException when password is wrong', async () => {
    findUserByEmail.execute.mockResolvedValue(user);

    await expect(
      useCase.execute({ email: user.email, password: 'wrong' }),
    ).rejects.toThrow(UnauthorizedException);
  });
});
