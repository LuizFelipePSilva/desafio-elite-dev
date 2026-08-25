import { Inject, Injectable } from '@nestjs/common';
import {
  EVENT_REPOSITORY,
  type IEventRepository,
} from '../../domain/repositories/event.repository.interface';
import { IEventPaginate } from '../dto/event-paginate.dto';

@Injectable()
export class GetAllEventsUseCase {
  constructor(
    @Inject(EVENT_REPOSITORY)
    private readonly eventRepository: IEventRepository,
  ) {}

  async execute(page: number, limit: number): Promise<IEventPaginate> {
    return this.eventRepository.findAll({ limit, page });
  }
}
