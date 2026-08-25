import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from './domain/entities/ticket.entity';
import { TICKET_REPOSITORY } from './domain/repositories/ticket.repository.interface';
import { TicketRepository } from './infrastructure/repositories/ticket.repository';
import { TicketController } from './infrastructure/ticket.controller';
import { GetTicketByReservations } from './application/use-cases/get-ticket-by-reservation.use-case';
import { FindTicketByIdUseCase } from './application/use-cases/find-ticket-by-id.use-case';
import { ValidateTicketUseCase } from './application/use-cases/validate-ticket.use-case';
import { ReservationsModule } from '../reservations/reservations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ticket]),
    forwardRef(() => ReservationsModule),
  ],
  controllers: [TicketController],
  providers: [
    GetTicketByReservations,
    FindTicketByIdUseCase,
    ValidateTicketUseCase,
    { provide: TICKET_REPOSITORY, useClass: TicketRepository },
  ],
  exports: [TICKET_REPOSITORY, ValidateTicketUseCase],
})
export class TicketsModule {}
