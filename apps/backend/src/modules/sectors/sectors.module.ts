import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sector } from './domain/entities/sector.entity';
import { SECTOR_REPOSITORY } from './domain/repositories/sector.repository.interface';
import { SectorRepository } from './infrastructure/repositories/sector.repository';
import { SectorController } from './infrastructure/sector.controller';
import { CreateSector } from './application/use-cases/create-sector.use-case';
import { FindSectorsByEventIdUseCase } from './application/use-cases/find-sectors.use-case';
import { EventsModule } from '../events/events.module';
import { FindSectorById } from './application/use-cases/find-sector-by-id.use-case';
import { IncrementQuantityUseCase } from './application/use-cases/increment-quantity.use-case';
import { DecrementQuantityUseCase } from './application/use-cases/decrement-quantity.use-case';
import { UpdateSector } from './application/use-cases/update-sector.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([Sector]), EventsModule],
  controllers: [SectorController],
  providers: [
    CreateSector,
    FindSectorsByEventIdUseCase,
    FindSectorById,
    IncrementQuantityUseCase,
    DecrementQuantityUseCase,
    UpdateSector,
    { provide: SECTOR_REPOSITORY, useClass: SectorRepository },
  ],
  exports: [
    SECTOR_REPOSITORY,
    FindSectorById,
    IncrementQuantityUseCase,
    DecrementQuantityUseCase,
  ],
})
export class SectorsModule {}
