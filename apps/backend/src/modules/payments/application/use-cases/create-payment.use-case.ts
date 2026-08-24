import { Inject } from '@nestjs/common';
import {
  type IPaymentRepository,
  PAYMENT_REPOSITORY,
} from '../../domain/repositories/payment.repository.interface';
import { CreatePaymentDTO } from '../dto/create-payment.dto';
import { FindReservationByIdUseCase } from 'src/modules/reservations/application/use-cases/find-reservation-by-id.use-case';

export class CreatePayment {
  constructor(
    @Inject(PAYMENT_REPOSITORY)
    private readonly paymentRepository: IPaymentRepository,
    private readonly findReservationById: FindReservationByIdUseCase,
  ) {}

  async execute(dto: CreatePaymentDTO) {
    await this.findReservationById.execute(dto.reservationId);

    return await this.paymentRepository.create({
      status: 'PENDING',
      amount: dto.amount,
      method: dto.method,
      reservationId: dto.reservationId,
      createdAt: new Date(),
    });
  }
}
