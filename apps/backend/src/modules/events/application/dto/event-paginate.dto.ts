import { Event } from '../../domain/event.entity';

export interface IEventPaginate {
  per_page: number;
  total: number;
  current_page: number;
  data: Event[];
  last_page: number;
}
