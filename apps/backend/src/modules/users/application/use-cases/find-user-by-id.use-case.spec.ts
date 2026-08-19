import { FindUserByIdUseCase } from './find-user-by-id.use-case';
import { IUserRepository } from '../../domain/repositories/user.repository.interface';
import { UserRole } from '../../domain/entities/user.entity';

describe('FindUserByIdUseCase', () => {
  let useCase: FindUserByIdUseCase;
  let repo: jest.Mocked<IUserRepository>;

  beforeEach(() => {
    repo = { create: jest.fn(), findByEmail: jest.fn(), findById: jest.fn() };
    useCase = new FindUserByIdUseCase(repo);
  });

  it('returns the user when found', async () => {
    const user = {
      id: 'uuid',
      name: 'John',
      email: 'john@example.com',
      password: 'hashed',
      role: UserRole.CUSTOMER,
    };
    repo.findById.mockResolvedValue(user);

    const result = await useCase.execute('uuid');

    expect(repo.findById).toHaveBeenCalledWith('uuid');
    expect(result).toEqual(user);
  });

  it('returns null when not found', async () => {
    repo.findById.mockResolvedValue(null);

    const result = await useCase.execute('missing');

    expect(result).toBeNull();
  });
});
