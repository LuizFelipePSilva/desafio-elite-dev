import { IEventPaginate } from '../../application/dto/event-paginate.dto';
import { Event } from '../event.entity';

export const EVENT_REPOSITORY = 'EVENT_REPOSITORY';
export interface SearchParams {
  page: number;
  limit: number;
}

export interface IEventRepository {
  create(data: Partial<Event>): Promise<Event>;
  findByExternalId(externalId: string): Promise<Event | null>;
  findAll(searchParams: SearchParams): Promise<IEventPaginate>;
  findById(id: string): Promise<Event | null>;
  update(id: string, data: Partial<Event>): Promise<Event>;
  delete(id: string): Promise<void>;
}
