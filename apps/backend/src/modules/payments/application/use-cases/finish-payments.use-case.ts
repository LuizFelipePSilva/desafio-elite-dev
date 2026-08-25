import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../domain/repositories/payment.repository.interface';
import {
  type ITicketRepository,
  TICKET_REPOSITORY,
} from 'src/modules/tickets/domain/repositories/ticket.repository.interface';
import { FinishReservation } from 'src/modules/reservations/application/use-cases/finish-reservation.use-case';
import { randomUUID } from 'crypto';

@Injectable()
export class FinishPaymentUseCase {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    @Inject(TICKET_REPOSITORY)
    private readonly ticketRepository: ITicketRepository,
    private readonly finishReservation: FinishReservation,
  ) {}

  async execute(paymentId: string) {
    const payment = await this.paymentRepository.findById(paymentId);
    if (!payment) throw new NotFoundException('Pagamento não encontrado');

    const reservation = await this.finishReservation.execute(
      payment.reservationId,
    );

    await this.paymentRepository.updateStatus(payment.id, 'APPROVED');

    return this.ticketRepository.create({
      reservationId: reservation!.id,
      ticketCode: randomUUID(),
      qrCode: randomUUID(),
    });
  }
}
