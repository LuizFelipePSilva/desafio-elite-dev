import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  type ISectorRepository,
  SECTOR_REPOSITORY,
} from '../../domain/repositories/sector.repository.interface';
import { Sector } from '../../domain/entities/sector.entity';
import { FindSectorById } from './find-sector-by-id.use-case';
import { FindEventByIdUseCase } from 'src/modules/events/application/use-cases/find-event-by-id.use-case';
import { UpdateSectorDTO } from '../dto/update-sector.dto';

@Injectable()
export class UpdateSector {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorRepository: ISectorRepository,
    private readonly findById: FindSectorById,
    private readonly findEventById: FindEventByIdUseCase,
  ) {}

  async execute(id: string, dto: UpdateSectorDTO): Promise<Sector> {
    const sector = await this.findById.execute(id);

    const sold = sector.capacity - sector.availableQuantity;

    if (dto.capacity !== undefined) {
      if (dto.capacity < sold) {
        throw new ConflictException(
          'Nova capacidade é menor que a quantidade já vendida',
        );
      }

      const event = await this.findEventById.execut(sector.eventId);
      const others = await this.sectorRepository.findByEventId(
        sector.eventId,
        1,
        1000,
      );
      const othersCapacity = others.data
        .filter((s) => s.id !== id)
        .reduce((total, s) => total + s.capacity, 0);

      if (othersCapacity + dto.capacity > event.capacity) {
        throw new ConflictException(
          'Capacidade supera a capacidade total do evento',
        );
      }
    }

    const newAvailableQuantity =
      dto.capacity !== undefined
        ? dto.capacity - sold
        : sector.availableQuantity;

    await this.sectorRepository.update(id, {
      name: dto.name ?? sector.name,
      price: dto.price ?? sector.price,
      capacity: dto.capacity ?? sector.capacity,
      availableQuantity: newAvailableQuantity,
    });

    return {
      ...sector,
      name: dto.name ?? sector.name,
      price: dto.price ?? sector.price,
      capacity: dto.capacity ?? sector.capacity,
      availableQuantity: newAvailableQuantity,
    };
  }
}
