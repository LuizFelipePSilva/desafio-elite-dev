import { AuthenticatedUser } from 'src/modules/auth/domain/jwt-payload.interface';

declare global {
  namespace Express {
    interface User extends AuthenticatedUser {}
  }
}

export {};
