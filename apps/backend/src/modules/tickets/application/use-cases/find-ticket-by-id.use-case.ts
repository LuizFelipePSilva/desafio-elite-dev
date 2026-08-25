import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type ITicketRepository,
  TICKET_REPOSITORY,
} from '../../domain/repositories/ticket.repository.interface';
import { Ticket } from '../../domain/entities/ticket.entity';

@Injectable()
export class FindTicketByIdUseCase {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async execute(id: string): Promise<Ticket> {
    const ticket = await this.ticketRepository.findById(id);
    if (!ticket) throw new NotFoundException('Ingresso não encontrado');
    return ticket;
  }
}
