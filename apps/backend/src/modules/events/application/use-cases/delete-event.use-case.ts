import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  type IEventRepository,
} from '../../domain/repositories/event.repository.interface';

@Injectable()
export class DeleteEventUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execut(id: string): Promise<void> {
    const event = await this.eventRepository.findByExternalId(id);
    if (!event)
      throw new NotFoundException('Nenhum evento correspondente encontrado');
    await this.eventRepository.delete(id);
  }
}
