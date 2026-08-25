import { forwardRef, Inject, Injectable } from '@nestjs/common';
import {
  type ITicketRepository,
  TICKET_REPOSITORY,
} from '../../domain/repositories/ticket.repository.interface';
import { ValidateTicketDTO } from '../dto/validate-ticket.dto';
import { FindReservationByIdUseCase } from 'src/modules/reservations/application/use-cases/find-reservation-by-id.use-case';

export const TicketValidationResult = {
  VALID: 'VALID',
  ALREADY_USED: 'ALREADY_USED',
  WRONG_EVENT: 'WRONG_EVENT',
  CANCELLED: 'CANCELLED',
  NOT_FOUND: 'NOT_FOUND',
} as const;
export type TicketValidationResult =
  (typeof TicketValidationResult)[keyof typeof TicketValidationResult];

export interface ValidateTicketOutput {
  result: TicketValidationResult;
  message: string;
  ticket?: {
    id: string;
    ticketCode: string;
    status: string;
    validatedAt: Date | null;
  };
}

@Injectable()
export class ValidateTicketUseCase {
  constructor(
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
    @Inject(forwardRef(() => FindReservationByIdUseCase))
    private readonly findReservationById: FindReservationByIdUseCase,
  ) {}

  async execute(
    dto: ValidateTicketDTO,
    gatekeeperId: string,
  ): Promise<ValidateTicketOutput> {
    const ticket = await this.ticketRepository.findByCode(dto.code);

    if (!ticket) {
      return { result: 'NOT_FOUND', message: 'Ingresso não encontrado' };
    }
    const eventId = (
      await this.findReservationById.execute(ticket.reservationId)
    ).eventId;
    if (eventId !== dto.eventId) {
      return {
        result: 'WRONG_EVENT',
        message: 'Ingresso não pertence a este evento',
        ticket,
      };
    }

    if (ticket.status === 'CANCELLED') {
      return { result: 'CANCELLED', message: 'Ingresso cancelado', ticket };
    }

    if (ticket.status === 'USED') {
      return {
        result: 'ALREADY_USED',
        message: `Ingresso já utilizado em ${ticket.validatedAt?.toISOString()}`,
        ticket,
      };
    }

    const validated = await this.ticketRepository.markValidated(
      ticket.id,
      gatekeeperId,
    );
    return { result: 'VALID', message: 'Ingresso válido', ticket: validated! };
  }
}
