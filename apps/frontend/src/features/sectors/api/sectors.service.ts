import {
  type CreateSectorInput,
  type PaginatedSectorsResponse,
  type Sector,
  type UpdateSectorInput,
} from '../types/sector.types';

import { apiGet, apiPatch, apiPost } from '@/shared/lib/httpClient';

export async function getSectorsByEventId(
  eventId: string,
  page = 1,
  limit = 10,
): Promise<PaginatedSectorsResponse> {
  return apiGet('/sectors', {
    params: { eventId, page, limit },
  });
}

export async function createSector(payload: CreateSectorInput): Promise<Sector> {
  return apiPost('/sectors', payload);
}

export async function updateSector(id: string, payload: UpdateSectorInput): Promise<Sector> {
  return apiPatch(`/sectors/${id}`, payload);
}
