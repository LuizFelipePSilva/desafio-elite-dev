import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reservation } from './domain/reservation.entity';
import { RESERVATION_REPOSITORY } from './domain/repositories/reservation.repository.interface';
import { ReservationRepository } from './infrastructure/repositories/reservation.repository';
import { ReservationController } from './infrastructure/reservation.controller';
import { CreateReservation } from './application/use-cases/create-reservation.use-case';
import { FinishReservation } from './application/use-cases/finish-reservation.use-case';
import { PaymentsModule } from '../payments/payments.module';
import { SectorsModule } from '../sectors/sectors.module';
import { EventsModule } from '../events/events.module';
import { FindReservationByIdUseCase } from './application/use-cases/find-reservation-by-id.use-case';
import { TicketsModule } from '../tickets/tickets.module';
import { GetMyReservations } from './application/use-cases/get-my-reservations.use-case';
import { CancelReservation } from './application/use-cases/cancel-reservation-use.case';

@Module({
  imports: [
    TypeOrmModule.forFeature([Reservation]),
    forwardRef(() => PaymentsModule),
    SectorsModule,
    EventsModule,
    forwardRef(() => TicketsModule),
  ],
  controllers: [ReservationController],
  providers: [
    CreateReservation,
    FinishReservation,
    FindReservationByIdUseCase,
    CancelReservation,
    GetMyReservations,
    { provide: RESERVATION_REPOSITORY, useClass: ReservationRepository },
  ],
  exports: [RESERVATION_REPOSITORY, FindReservationByIdUseCase],
})
export class ReservationsModule {}
