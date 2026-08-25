export interface TicketmasterEvent {
  externalId: string;
  title: string;
  venue: string;
  imageUrl: string;
  eventDate: string;
}

export interface Page {
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
}

export interface TicketmasterEventsResponse {
  events: TicketmasterEvent[];
  page: Page;
}

export type EventType = 'SEAT' | 'TICKET';
export type EventStatus = 'OPEN' | 'CLOSE' | 'MAINTENANCE';

export interface CreateEventInput {
  title: string;
  description: string;
  externalId: string;
  location: string;
  eventDate: Date;
  capacity: number;
  eventType: EventType;
  status: EventStatus;
}
