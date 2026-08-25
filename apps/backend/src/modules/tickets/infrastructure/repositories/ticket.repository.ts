import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Ticket, TicketStatus } from '../../domain/entities/ticket.entity';
import { ITicketRepository } from '../../domain/repositories/ticket.repository.interface';

@Injectable()
export class TicketRepository implements ITicketRepository {
  constructor(
    @InjectRepository(Ticket)
    private readonly repo: Repository<Ticket>,
  ) {}

  create(data: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.repo.create(data);
    return this.repo.save(ticket);
  }

  findById(id: string): Promise<Ticket | null> {
    return this.repo.findOneBy({ id: id });
  }

  findByCode(ticketCode: string): Promise<Ticket | null> {
    return this.repo.findOneBy({ qrCode: ticketCode });
  }

  findByReservationId(reservationId: string): Promise<Ticket | null> {
    return this.repo.findOneBy({ reservationId });
  }
  async findByReservationsIds(reservationsIds: string[]): Promise<Ticket[]> {
    const tickets = await this.repo.find({
      where: { reservationId: In(reservationsIds) },
    });
    return tickets;
  }
  async markValidated(
    id: string,
    validatedByUserId: string,
  ): Promise<Ticket | null> {
    await this.repo.update(id, {
      status: TicketStatus.USED,
      validatedAt: new Date(),
      validatedByUserId,
    });
    return this.findById(id);
  }

  async updateStatus(id: string, status: TicketStatus): Promise<Ticket | null> {
    await this.repo.update(id, { status });
    return this.findById(id);
  }
}
