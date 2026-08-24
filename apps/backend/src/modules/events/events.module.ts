import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './domain/event.entity';
import { EventsController } from './infrastructure/event.controller';
import { CreateEventUseCase } from './application/use-cases/create-event.use-case';
import { EVENT_REPOSITORY } from './domain/repositories/event.repository.interface';
import { EventRepository } from './infrastructure/repository/event.repository';
import { GetAllEventsUseCase } from './application/use-cases/get-all-events.use-case';
import { FindEventByIdUseCase } from './application/use-cases/find-event-by-id.use-case';
import { UpdateEventUseCase } from './application/use-cases/update-event.use-case';
import { DeleteEventUseCase } from './application/use-cases/delete-event.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Event])],
  controllers: [EventsController],
  providers: [
    { provide: EVENT_REPOSITORY, useClass: EventRepository },
    CreateEventUseCase,
    GetAllEventsUseCase,
    FindEventByIdUseCase,
    UpdateEventUseCase,
    DeleteEventUseCase,
  ],
  exports: [FindEventByIdUseCase, EVENT_REPOSITORY],
})
export class EventsModule {}
