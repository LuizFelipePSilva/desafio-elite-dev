import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type ISectorRepository,
  SECTOR_REPOSITORY,
} from '../../domain/repositories/sector.repository.interface';

@Injectable()
export class FindSectorById {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorRepository: ISectorRepository,
  ) {}

  async execute(id: string) {
    const sector = await this.sectorRepository.findById(id);
    if (!sector) throw new NotFoundException('Setor não existe');
    return sector;
  }
}
