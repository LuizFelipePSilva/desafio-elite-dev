import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  type IEventRepository,
} from '../../domain/repositories/event.repository.interface';
import { CreateEventDto } from '../dto/create-event.dto';
import { Event } from '../../domain/event.entity';

@Injectable()
export class CreateEventUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(dto: CreateEventDto): Promise<Event> {
    const exists = await this.eventRepository.findByExternalId(dto.externalId);
    if (exists) throw new ConflictException('Evento já existe');

    const event = this.eventRepository.create({
      capacity: dto.capacity,
      description: dto.description,
      eventDate: dto.eventDate,
      externalId: dto.externalId,
      location: dto.location,
      status: dto.status,
      title: dto.title,
    });

    return event;
  }
}
