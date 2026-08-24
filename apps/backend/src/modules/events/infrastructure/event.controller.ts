import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CreateEventUseCase } from '../application/use-cases/create-event.use-case';
import { CreateEventDto } from '../application/dto/create-event.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Event } from '../domain/event.entity';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { GetAllEventsUseCase } from '../application/use-cases/get-all-events.use-case';
import { UpdateEventDto } from '../application/dto/update-event.dto';
import { UpdateEventUseCase } from '../application/use-cases/update-event.use-case';
import { DeleteEventUseCase } from '../application/use-cases/delete-event.use-case';

@ApiTags('Events')
@Controller('events')
export class EventsController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getAllEventUseCase: GetAllEventsUseCase,
    private readonly updateEventUseCase: UpdateEventUseCase,
    private readonly deleteEventUseCase: DeleteEventUseCase,
  ) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  @ApiOperation({ summary: 'Created event' })
  @ApiResponse({
    status: 201,
    description: 'Event created successfully',
    type: Event,
  })
  create(@Body() dto: CreateEventDto) {
    return this.createEventUseCase.execute(dto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.getAllEventUseCase.execute(page, limit);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  update(@Param('id') id: string, @Body() dto: UpdateEventDto) {
    return this.updateEventUseCase.execute(id, dto);
  }

  @Delete()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ORGANIZER)
  delete(@Param('id') id: string) {
    return this.deleteEventUseCase.execut(id);
  }
}
