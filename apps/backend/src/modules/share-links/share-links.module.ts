import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShareLink } from './domain/entities/share-link.entity';
import { SHARE_LINK_REPOSITORY } from './domain/repositories/share-link.repository.interface';
import { ShareLinkRepository } from './infrastructure/repositories/share-link.repository';
import { ShareLinkController } from './infrastructure/share-link.controller';
import { CreateShareLinkUseCase } from './applications/use-cases/create-share-link.use-case';
import { GetSharedTicketUseCase } from './applications/use-cases/get-shared-ticket.use-case';
import { RevokeShareLinkUseCase } from './applications/use-cases/revoke-shared-link.use-case';
import { TicketsModule } from '../tickets/tickets.module';
import { Ticket } from '../tickets/domain/entities/ticket.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShareLink, Ticket]), TicketsModule],
  controllers: [ShareLinkController],
  providers: [
    CreateShareLinkUseCase,
    GetSharedTicketUseCase,
    RevokeShareLinkUseCase,
    { provide: SHARE_LINK_REPOSITORY, useClass: ShareLinkRepository },
  ],
  exports: [SHARE_LINK_REPOSITORY],
})
export class ShareLinksModule {}
