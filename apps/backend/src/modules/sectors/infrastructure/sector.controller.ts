import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSector } from '../application/use-cases/create-sector.use-case';
import { CreateSectorDTO } from '../application/dto/create-sector-of-event.dto';
import { FindSectorsByEventIdUseCase } from '../application/use-cases/find-sectors.use-case';
import { UpdateSector } from '../application/use-cases/update-sector.use-case';
import { UpdateSectorDTO } from '../application/dto/update-sector.dto';

@ApiTags('Sectors')
@Controller('sectors')
export class SectorController {
  constructor(
    private readonly createSector: CreateSector,
    private readonly findSectorsByEventId: FindSectorsByEventIdUseCase,
    private readonly updateSector: UpdateSector,
  ) {}

  @Post()
  create(@Body() dto: CreateSectorDTO) {
    return this.createSector.execute(dto);
  }

  @Get()
  getAll(
    @Query('eventId') eventId: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.findSectorsByEventId.execute(
      eventId,
      Number(page),
      Number(limit),
    );
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSectorDTO) {
    return this.updateSector.execute(id, dto);
  }
}
