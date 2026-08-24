import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { FindEventByIdUseCase } from 'src/modules/events/application/use-cases/find-event-by-id.use-case';
import { CreateSectorDTO } from '../dto/create-sector-of-event.dto';
import {
  type ISectorRepository,
  SECTOR_REPOSITORY,
} from '../../domain/repositories/sector.repository.interface';

@Injectable()
export class CreateSector {
  constructor(
    @Inject(SECTOR_REPOSITORY)
    private readonly sectorRepository: ISectorRepository,
    private readonly findEventById: FindEventByIdUseCase,
  ) {}

  async execute(dto: CreateSectorDTO) {
    const eventExist = await this.findEventById.execut(dto.eventId);
    const events = await this.sectorRepository.findByEventId(
      dto.eventId,
      1,
      1000,
    );

    const actualCapacity = events.data.reduce(
      (total, event) => total + event.capacity,
      0,
    );
    if (actualCapacity + dto.capacity > eventExist.capacity) {
      throw new ConflictException(
        'Capacidade supera a capacidade total do evento',
      );
    }

    const sector = await this.sectorRepository.create({
      capacity: dto.capacity,
      eventId: dto.eventId,
      name: dto.name,
      price: dto.price,
      availableQuantity: dto.capacity,
    });
    return sector;
  }
}
