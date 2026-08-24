import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  type IReservationRepository,
  RESERVATION_REPOSITORY,
} from '../../domain/repositories/reservation.repository.interface';
import {
  type IPaymentRepository,
  PAYMENT_REPOSITORY,
} from 'src/modules/payments/domain/repositories/payment.repository.interface';
import {
  type ITicketRepository,
  TICKET_REPOSITORY,
} from 'src/modules/tickets/domain/repositories/ticket.repository.interface';
import { IncrementQuantityUseCase } from 'src/modules/sectors/application/use-cases/increment-quantity.use-case';

@Injectable()
export class CancelReservation {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
    private readonly incrementQuantity: IncrementQuantityUseCase,
  ) {}

  async execute(reservationId: string, userId: string): Promise<void> {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation) throw new NotFoundException('Reserva não encontrada');

    if (reservation.userId !== userId) {
      throw new ConflictException('Reserva não pertence ao usuário');
    }

    if (reservation.status === 'CANCELLED') {
      throw new ConflictException('Reserva já está cancelada');
    }

    if (reservation.status === 'EXPIRED') {
      throw new ConflictException('Reserva expirada não pode ser cancelada');
    }

    const payment = await this.paymentRepository.findByReservationId(
      reservation.id,
    );

    if (reservation.status === 'PAID') {
      const ticket = await this.ticketRepository.findByReservationId(
        reservation.id,
      );
      if (ticket && ticket.status === 'VALID') {
        if (ticket.validatedBy) {
          throw new ConflictException(
            'Ingresso já utilizado, não pode ser cancelado',
          );
        }
        await this.ticketRepository.updateStatus(ticket.id, 'CANCELLED');
      }

      await this.incrementQuantity.execute(reservation.sectorId);

      if (payment) {
        await this.paymentRepository.updateStatus(payment.id, 'DECLINED');
      }
    } else if (payment && payment.status === 'PENDING') {
      await this.paymentRepository.updateStatus(payment.id, 'DECLINED');
    }

    await this.reservationRepository.updateStatus(reservation.id, 'CANCELLED');
  }
}
