import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from 'src/modules/users/domain/repositories/user.repository.interface';
import { EventStatus } from 'src/modules/events/domain/event.entity';
import {
  type IEventRepository,
  EVENT_REPOSITORY,
} from 'src/modules/events/domain/repositories/event.repository.interface';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
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

    const events = [
      {
        title: 'aespa LIVE TOUR - SYNK : COMPLæXITY -',
        description: 'Evento impressionate',
        externalId: 'ZFIMVHtnMZ17FA-s',
        location: 'Mercado Livre Arena Pacaembu',
        eventDate: new Date('2026-01-04T23:00:00.000Z'),
        capacity: 100,
        status: EventStatus.OPEN,
      },
      {
        title: 'Rock in Rio 2026',
        description: 'Evento impressionate',
        externalId: 'ZFIMVHtnMZ17A6x7',
        location: 'Cidade do Rock',
        eventDate: new Date('2026-09-06'),
        capacity: 100,
        status: EventStatus.OPEN,
      },
    ];
    for (const e of events) {
      const exists = await this.eventRepository.findByExternalId(e.externalId);
      if (!exists) this.eventRepository.create(e);
    }
  }
}
