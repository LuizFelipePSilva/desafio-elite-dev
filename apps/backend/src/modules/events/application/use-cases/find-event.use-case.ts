import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  type IEventRepository,
} from '../../domain/repositories/event.repository.interface';
import { Event } from '../../domain/event.entity';

@Injectable()
export class FindEventUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execut(externalId: string): Promise<Event> {
    const event = await this.eventRepository.findByExternalId(externalId);
    if (!event)
      throw new NotFoundException('Nenhum evento correspondente encontrado');
    return event;
  }
}
