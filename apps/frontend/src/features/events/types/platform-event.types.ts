export type EventStatus = 'OPEN' | 'CLOSE' | 'MAINTENACE';

export interface PlatformEvent {
  id: string;
  title: string;
  description: string;
  externalId: string;
  location: string;
  eventDate: string;
  capacity: number;
  status: EventStatus;
}

export interface PaginatedEventsResponse {
  per_page: number;
  total: number;
  current_page: number;
  data: PlatformEvent[];
  last_page: number;
}

export interface UpdateEventInput {
  title: string;
  description: string;
  externalId: string;
  location: string;
  eventDate: string;
  capacity: number;
  status: EventStatus;
}
