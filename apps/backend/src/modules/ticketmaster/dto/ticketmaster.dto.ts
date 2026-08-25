export interface TicketmasterVenueDto {
  name?: string;
  city?: {
    name?: string;
  };
}

export interface TicketmasterEventDto {
  id: string;
  name: string;
  info?: string;

  dates: {
    start: {
      localDate?: string;
      dateTime?: string;
    };
  };

  images?: Array<{
    url: string;
  }>;

  _embedded?: {
    venues?: TicketmasterVenueDto[];
  };
}

export interface TicketmasterPageDto {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface TicketmasterEventsResponseDto {
  _embedded?: {
    events?: TicketmasterEventDto[];
  };

  page?: TicketmasterPageDto;
}

export interface TicketmasterSearchParamsDto {
  keyword?: string;
  page?: number;
  size?: number;
}

export interface PaginatedEventsDto {
  events: import('../interfaces/external-event.interface').ExternalEvent[];
  page: TicketmasterPageDto;
}
