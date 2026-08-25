import { Inject, Injectable } from '@nestjs/common';
import {
  type ISectorRepository,
  SECTOR_REPOSITORY,
} from '../../domain/repositories/sector.repository.interface';
import { Sector } from '../../domain/entities/sector.entity';

export interface ISectorPaginate {
  data: Sector[];
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
}

@Injectable()
export class FindSectorsByEventIdUseCase {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorRepository: ISectorRepository,
  ) {}

  async execute(
    eventId: string,
    page: number,
    limit: number,
  ): Promise<ISectorPaginate> {
    const { data, total } = await this.sectorRepository.findByEventId(
      eventId,
      page,
      limit,
    );

    return {
      data,
      total,
      per_page: limit,
      current_page: page,
      last_page: Math.ceil(total / limit),
    };
  }
}
