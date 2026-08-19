import { ConflictException } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';

describe('CreateUserUseCase', () => {
  let useCase: CreateUserUseCase;
  let repo: jest.Mocked<IUserRepository>;

  const dto: CreateUserDto = {
    name: 'John Doe',
    email: 'john@example.com',
    password: '123456',
    confirm_password: '123456',
  };

  beforeEach(() => {
    repo = {
      create: jest.fn(),
      findByEmail: jest.fn(),
      findById: jest.fn(),
    };
    useCase = new CreateUserUseCase(repo);
  });

  it('creates a user when email is not taken and passwords match', async () => {
    repo.findByEmail.mockResolvedValue(null);
    repo.create.mockResolvedValue({
      id: 'uuid',
      name: dto.name,
      email: dto.email,
      password: 'hashed',
    });

    const result = await useCase.execute(dto);

    expect(repo.findByEmail).toHaveBeenCalledWith(dto.email);
    expect(repo.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: dto.email,
        name: dto.name,
      }),
    );
    expect(result.email).toBe(dto.email);
  });

  it('throws ConflictException when email already exists', async () => {
    repo.findByEmail.mockResolvedValue({
      id: 'uuid',
      name: dto.name,
      email: dto.email,
      password: 'hashed',
      role: dto.role,
    });

    await expect(useCase.execute(dto)).rejects.toThrow(ConflictException);
    expect(repo.create).not.toHaveBeenCalled();
  });

  it('throws ConflictException when passwords do not match', async () => {
    repo.findByEmail.mockResolvedValue(null);

    await expect(
      useCase.execute({ ...dto, confirm_password: 'different' }),
    ).rejects.toThrow(ConflictException);
    expect(repo.create).not.toHaveBeenCalled();
  });
});
