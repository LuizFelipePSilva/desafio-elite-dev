import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from './domain/entities/payment.entity';
import { PAYMENT_REPOSITORY } from './domain/repositories/payment.repository.interface';
import { PaymentRepository } from './infrastructure/repositories/payment.repository';
import { CreatePayment } from './application/use-cases/create-payment.use-case';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Payment]),
    forwardRef(() => ReservationsModule),
  ],
  providers: [
    CreatePayment,
    { provide: PAYMENT_REPOSITORY, useClass: PaymentRepository },
  ],
  exports: [CreatePayment, PAYMENT_REPOSITORY],
})
export class PaymentsModule {}
