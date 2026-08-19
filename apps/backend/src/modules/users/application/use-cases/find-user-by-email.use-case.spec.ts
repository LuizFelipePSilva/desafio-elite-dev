import { FindUserByEmailUseCase } from './find-user-by-email.use-case';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserRole } from '../../domain/entities/user.entity';

describe('FindUserByEmailUseCase', () => {
  let useCase: FindUserByEmailUseCase;
  let repo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    repo = { create: jest.fn(), findByEmail: jest.fn(), findById: jest.fn() };
    useCase = new FindUserByEmailUseCase(repo);
  });

  it('returns the user when found', async () => {
    const user = {
      id: 'uuid',
      name: 'John',
      email: 'john@example.com',
      password: 'hashed',
      role: UserRole.CUSTOMER,
    };
    repo.findByEmail.mockResolvedValue(user);

    const result = await useCase.execute('john@example.com');

    expect(repo.findByEmail).toHaveBeenCalledWith('john@example.com');
    expect(result).toEqual(user);
  });

  it('returns null when not found', async () => {
    repo.findByEmail.mockResolvedValue(null);

    const result = await useCase.execute('missing@example.com');

    expect(result).toBeNull();
  });
});
