import { Injectable } from '@nestjs/common';

import { TicketmasterEventDto } from './dto/ticketmaster.dto';
import { ExternalEvent } from './interfaces/external-event.interface';

@Injectable()
export class TicketmasterMapper {
  toExternalEvent(event: TicketmasterEventDto): ExternalEvent {
    const venue = event._embedded?.venues?.[0];

    return {
      externalId: event.id,
      title: event.name,
      description: event.info,
      venue: venue?.name,
      city: venue?.city?.name,
      imageUrl: event.images?.[0]?.url,
      eventDate: new Date(
        event.dates.start.dateTime ?? event.dates.start.localDate!,
      ),
    };
  }
}
