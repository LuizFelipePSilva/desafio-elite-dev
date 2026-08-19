import { UserRole } from '../../users/domain/entities/user.entity';

export interface JwtPayload {
  sub: string;
  role: UserRole;
}

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
}
