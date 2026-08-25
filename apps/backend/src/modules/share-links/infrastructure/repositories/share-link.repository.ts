import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ShareLink } from '../../domain/entities/share-link.entity';
import { IShareLinkRepository } from '../../domain/repositories/share-link.repository.interface';
import { Ticket } from 'src/modules/tickets/domain/entities/ticket.entity';

@Injectable()
export class ShareLinkRepository implements IShareLinkRepository {
  constructor(
    @InjectRepository(ShareLink)
    private readonly repository: Repository<ShareLink>,
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async create(data: {
    ticketId: string;
    token: string;
    expiresAt: Date;
  }): Promise<ShareLink> {
    const entity = this.repository.create(data);

    return this.repository.save(entity);
  }

  async findByToken(token: string): Promise<ShareLink | null> {
    return this.repository.findOne({
      where: { token },
      relations: {
        ticket: true,
      },
    });
  }

  async findByTicketId(ticketId: string): Promise<ShareLink | null> {
    return this.repository.findOne({
      where: {
        ticketId,
      },
    });
  }

  async softDelete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }

  async findTicketOwnedByUser(
    ticketId: string,
    userId: string,
  ): Promise<boolean> {
    const ticket = await this.ticketRepository
      .createQueryBuilder('ticket')
      .innerJoin('ticket.reservation', 'reservation')
      .where('ticket.id = :ticketId', { ticketId })
      .andWhere('reservation.userId = :userId', { userId })
      .getOne();

    return !!ticket;
  }
}
