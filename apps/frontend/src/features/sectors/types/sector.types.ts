export interface Sector {
  id: string;
  name: string;
  price: number | string;
  availableQuantity: number;
  capacity: number;
  eventId: string;
}

export interface PaginatedSectorsResponse {
  per_page: number;
  total: number;
  current_page: number;
  data: Sector[];
  last_page: number;
}

export interface CreateSectorInput {
  name: string;
  price: number;
  capacity: number;
  eventId: string;
}

export interface UpdateSectorInput {
  name?: string;
  price?: number;
  capacity?: number;
}
