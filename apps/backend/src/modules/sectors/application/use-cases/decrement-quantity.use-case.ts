import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  type ISectorRepository,
  SECTOR_REPOSITORY,
} from '../../domain/repositories/sector.repository.interface';
import { Sector } from '../../domain/entities/sector.entity';
import { FindSectorById } from './find-sector-by-id.use-case';

@Injectable()
export class DecrementQuantityUseCase {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorRepository: ISectorRepository,
    private readonly findById: FindSectorById,
  ) {}

  async execute(id: string): Promise<Sector> {
    const sector = await this.findById.execute(id);

    if (sector.availableQuantity <= 0) {
      throw new ConflictException('Capacidade minima atingida');
    }
    sector.availableQuantity--;

    await this.sectorRepository.update(id, {
      availableQuantity: sector.availableQuantity,
    });

    return sector;
  }
}
