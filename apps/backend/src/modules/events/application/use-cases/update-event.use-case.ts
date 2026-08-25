import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  type IEventRepository,
} from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/event.entity';
import { UpdateEventDto } from '../dto/update-event.dto';
import { FindEventByIdUseCase } from './find-event-by-id.use-case';

@Injectable()
export class UpdateEventUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
    private readonly findEventByIdUseCase: FindEventByIdUseCase,
  ) {}

  async execute(id: string, dto: UpdateEventDto): Promise<Event> {
    await this.findEventByIdUseCase.execut(id);

    if (dto.eventDate < new Date())
      throw new ConflictException(
        'Evento não pode ser marcado para data anterior a hoje',
      );

    const event = this.eventRepository.update(id, dto);
    return event;
  }
}
