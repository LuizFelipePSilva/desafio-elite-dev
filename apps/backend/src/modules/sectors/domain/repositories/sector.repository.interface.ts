import { Sector } from '../entities/sector.entity';

export const SECTOR_REPOSITORY = 'SECTOR_REPOSITORY';

export interface ISectorRepository {
  create(data: Partial<Sector>): Promise<Sector>;
  findById(id: string): Promise<Sector | null>;
  findByEventId(
    eventId: string,
    page: number,
    limit: number,
  ): Promise<{ data: Sector[]; total: number }>;
  update(id: string, data: Partial<Sector>): Promise<Sector | null>;
  delete(id: string): Promise<void>;
}
