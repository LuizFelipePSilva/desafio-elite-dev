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
import { Ticket } from 'src/modules/tickets/domain/entities/ticket.entity';
import { randomUUID } from 'crypto';
import { DecrementQuantityUseCase } from 'src/modules/sectors/application/use-cases/decrement-quantity.use-case';

@Injectable()
export class FinishReservation {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
    private readonly decrementQuantity: DecrementQuantityUseCase,
  ) {}

  async execute(reservationId: string): Promise<Ticket> {
    const reservation =
      await this.reservationRepository.findById(reservationId);
    if (!reservation) throw new NotFoundException('Reserva não encontrada');

    const payment =
      await this.paymentRepository.findByReservationId(reservationId);
    if (!payment) throw new NotFoundException('Pagamento não encontrado');

    if (reservation.expiresAt < new Date()) {
      await this.reservationRepository.updateStatus(reservation.id, 'EXPIRED');
      await this.paymentRepository.updateStatus(payment.id, 'DECLINED');
      throw new ConflictException('Tempo de pagamento excedido');
    }
    await this.decrementQuantity.execute(reservation.sectorId);
    await this.reservationRepository.updateStatus(reservation.id, 'PAID');
    await this.paymentRepository.updateStatus(payment.id, 'APPROVED');

    return this.ticketRepository.create({
      reservationId: reservation.id,
      ticketCode: randomUUID(),
      qrCode: randomUUID(),
    });
  }
}
