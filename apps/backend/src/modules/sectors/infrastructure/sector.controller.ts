import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSector } from '../application/use-cases/create-sector.use-case';
import { CreateSectorDTO } from '../application/dto/create-sector-of-event.dto';
import { FindSectorsByEventIdUseCase } from '../application/use-cases/find-sectors.use-case';
import { UpdateSector } from '../application/use-cases/update-sector.use-case';
import { UpdateSectorDTO } from '../application/dto/update-sector.dto';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';

@ApiTags('Sectors')
@Controller('sectors')
export class SectorController {
  constructor(
    private readonly createSector: CreateSector,
    private readonly findSectorsByEventId: FindSectorsByEventIdUseCase,
    private readonly updateSector: UpdateSector,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  create(@Body() dto: CreateSectorDTO) {
    return this.createSector.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
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
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  update(@Param('id') id: string, @Body() dto: UpdateSectorDTO) {
    return this.updateSector.execute(id, dto);
  }
}
