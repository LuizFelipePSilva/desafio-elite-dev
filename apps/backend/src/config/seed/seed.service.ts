import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from 'src/modules/users/domain/repositories/user.repository.interface';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async onModuleInit() {
    const hash = (pw: string) => bcrypt.hash(pw + process.env.PEPPER, 12);
    const users = [
      {
        name: 'Organizador Padrão',
        email: 'organizador@example.com',
        password: await hash('Organizador@123'),
        role: UserRole.ORGANIZER,
      },
      {
        name: 'Cliente Um',
        email: 'cliente1@example.com',
        password: await hash('Cliente1@123'),
        role: UserRole.CUSTOMER,
      },
      {
        name: 'Cliente Dois',
        email: 'cliente2@example.com',
        password: await hash('Cliente2@123'),
        role: UserRole.CUSTOMER,
      },
      {
        name: 'Vendedor Um',
        email: 'vendedor@example.com',
        password: await hash('Vendedor@123'),
        role: UserRole.GATEKEEPER,
      },
    ];

    for (const u of users) {
      const exists = await this.userRepository.findByEmail(u.email);
      if (!exists) this.userRepository.create(u);
    }
  }
}
