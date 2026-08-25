import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  type ISectorRepository,
  SECTOR_REPOSITORY,
} from '../../domain/repositories/sector.repository.interface';
import { Sector } from '../../domain/entities/sector.entity';
import { FindSectorById } from './find-sector-by-id.use-case';

@Injectable()
export class IncrementQuantityUseCase {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorRepository: ISectorRepository,
    private readonly findById: FindSectorById,
  ) {}

  async execute(id: string): Promise<Sector> {
    const sector = await this.findById.execute(id);

    if (sector.availableQuantity >= sector.capacity) {
      throw new ConflictException('Capacidade máxima atingida');
    }
    sector.availableQuantity++;

    await this.sectorRepository.update(id, {
      availableQuantity: sector.availableQuantity,
    });

    return sector;
  }
}
