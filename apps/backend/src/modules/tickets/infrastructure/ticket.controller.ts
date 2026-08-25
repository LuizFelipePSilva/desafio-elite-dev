import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { GetTicketByReservations } from '../application/use-cases/get-ticket-by-reservation.use-case';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { ReservationsIds } from '../application/dto/reservations-ids.dto';
import { FindTicketByIdUseCase } from '../application/use-cases/find-ticket-by-id.use-case';
import { type Request as ExpressRequest } from 'express';
import { ValidateTicketDTO } from '../application/dto/validate-ticket.dto';
import { ValidateTicketUseCase } from '../application/use-cases/validate-ticket.use-case';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('tickets')
export class TicketController {
  constructor(
    private readonly getTicketsByReservations: GetTicketByReservations,
    private readonly findTicketById: FindTicketByIdUseCase,
    private readonly validateTicket: ValidateTicketUseCase,
  ) {}

  @Get()
  @Roles('CUSTOMER')
  getTicketsByReservation(@Query() dto: ReservationsIds) {
    return this.getTicketsByReservations.execute(dto);
  }

  @Get(':id')
  @Roles('CUSTOMER')
  findTicket(@Param('id') id: string) {
    return this.findTicketById.execute(id);
  }
  @Post('validate')
  @Roles('GATEKEEPER')
  validate(@Req() req: ExpressRequest, @Body() dto: ValidateTicketDTO) {
    return this.validateTicket.execute(dto, req.user!.id);
  }
}
