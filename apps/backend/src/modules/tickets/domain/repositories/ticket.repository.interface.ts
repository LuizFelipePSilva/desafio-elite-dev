import { Ticket, TicketStatus } from '../entities/ticket.entity';

export const TICKET_REPOSITORY = 'TICKET_REPOSITORY';

export interface ITicketRepository {
  create(data: Partial<Ticket>): Promise<Ticket>;
  findById(id: string): Promise<Ticket | null>;
  findByCode(ticketCode: string): Promise<Ticket | null>;
  findByReservationId(reservationId: string): Promise<Ticket | null>;
  findByReservationsIds(reservationsIds: string[]): Promise<Ticket[]>;
  markValidated(id: string, validatedByUserId: string): Promise<Ticket | null>;
  updateStatus(id: string, status: TicketStatus): Promise<Ticket | null>;
}
