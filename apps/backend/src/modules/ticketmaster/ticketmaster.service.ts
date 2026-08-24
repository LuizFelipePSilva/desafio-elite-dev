import { Injectable } from '@nestjs/common';

import { TicketmasterClient } from './ticketmaster.client';
import { TicketmasterMapper } from './ticketmaster.mapper';
import {
  PaginatedEventsDto,
  TicketmasterSearchParamsDto,
} from './dto/ticketmaster.dto';

@Injectable()
export class TicketmasterService {
  constructor(
    private readonly client: TicketmasterClient,
    private readonly mapper: TicketmasterMapper,
  ) {}

  async searchEvents(
    params: TicketmasterSearchParamsDto,
  ): Promise<PaginatedEventsDto> {
    const response = await this.client.searchEvents(params);
    const events = response._embedded?.events ?? [];

    return {
      events: events.map((event) => this.mapper.toExternalEvent(event)),
      page: response.page ?? {
        size: 0,
        totalElements: 0,
        totalPages: 0,
        number: 0,
      },
    };
  }
}
