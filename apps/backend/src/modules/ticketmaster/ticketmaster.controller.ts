import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { TicketmasterService } from './ticketmaster.service';
import { JwtAuthGuard } from '../auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { UserRole } from '../users/domain/entities/user.entity';
import { Roles } from 'src/shared/decorators/roles.decorator';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ORGANIZER)
@Controller('ticketmaster')
export class TicketmasterController {
  constructor(private readonly ticketmasterService: TicketmasterService) {}

  @Get('events')
  async findEvents(
    @Query('keyword') keyword?: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
  ) {
    return this.ticketmasterService.searchEvents({
      keyword,
      page: page ? Number(page) : undefined,
      size: size ? Number(size) : undefined,
    });
  }
}
