import { Inject, Injectable } from '@nestjs/common';
import {
  type ITicketRepository,
  TICKET_REPOSITORY,
} from '../../domain/repositories/ticket.repository.interface';
import { Ticket } from '../../domain/entities/ticket.entity';
import { ReservationsIds } from '../dto/reservations-ids.dto';

@Injectable()
export class GetTicketByReservations {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
  ) {}

  async execute(dto: ReservationsIds): Promise<Ticket[]> {
    return await this.ticketRepository.findByReservationsIds(
      dto.reservationsIds,
    );
  }
}
