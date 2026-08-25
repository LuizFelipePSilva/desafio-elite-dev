import {
  Injectable,
  Inject,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import {
  TICKET_REPOSITORY,
  type ITicketRepository,
} from 'src/modules/tickets/domain/repositories/ticket.repository.interface';
import {
  SHARE_LINK_REPOSITORY,
  type IShareLinkRepository,
} from '../../domain/repositories/share-link.repository.interface';

@Injectable()
export class CreateShareLinkUseCase {
  constructor(
    @Inject(SHARE_LINK_REPOSITORY)
    private readonly shareLinkRepository: IShareLinkRepository,

    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async execute(ticketId: string, userId: string) {
    const owned = await this.shareLinkRepository.findTicketOwnedByUser(
      ticketId,
      userId,
    );

    if (!owned) {
      throw new ForbiddenException('Você não possui este ingresso');
    }
    const ticket = await this.ticketRepository.findById(ticketId);

    if (!ticket) {
      throw new NotFoundException('Ingresso não encontrado');
    }

    const existing = await this.shareLinkRepository.findByTicketId(ticketId);

    if (existing && existing.expiresAt > new Date()) {
      return {
        url: `${process.env.FRONTEND_URL}/shared-ticket/${existing.token}`,
        expiresAt: existing.expiresAt,
      };
    }

    const token = randomUUID();

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30);

    const link = await this.shareLinkRepository.create({
      ticketId,
      token,
      expiresAt,
    });

    return {
      url: `${process.env.FRONTEND_URL}/shared-ticket/${link.token}`,
      expiresAt,
    };
  }
}
