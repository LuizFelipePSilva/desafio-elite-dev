import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';

import { firstValueFrom } from 'rxjs';

import {
  TicketmasterEventsResponseDto,
  TicketmasterSearchParamsDto,
} from './dto/ticketmaster.dto';

@Injectable()
export class TicketmasterClient {
  private readonly baseUrl = 'https://app.ticketmaster.com/discovery/v2';

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {}

  async searchEvents(
    params: TicketmasterSearchParamsDto,
  ): Promise<TicketmasterEventsResponseDto> {
    const { data } = await firstValueFrom(
      this.http.get<TicketmasterEventsResponseDto>(
        `${this.baseUrl}/events.json`,
        {
          params: {
            keyword: params.keyword,
            page: params.page,
            size: params.size,
            countryCode: 'BR',
            apikey: this.config.getOrThrow<string>('TICKETMASTER_API_KEY'),
          },
        },
      ),
    );

    return data;
  }

  async getEvent(eventId: string): Promise<unknown> {
    const { data } = await firstValueFrom(
      this.http.get(`${this.baseUrl}/events/${eventId}.json`, {
        params: {
          apikey: this.config.getOrThrow<string>('TICKETMASTER_API_KEY'),
        },
      }),
    );

    return data;
  }
}
