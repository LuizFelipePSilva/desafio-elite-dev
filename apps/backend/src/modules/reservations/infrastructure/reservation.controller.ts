import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { CreateReservationDTO } from '../application/dto/create-reservation.dto';
import { CreateReservation } from '../application/use-cases/create-reservation.use-case';
import { FinishReservation } from '../application/use-cases/finish-reservation.use-case';
import type { Request as ExpressRequest } from 'express';
import { GetMyReservations } from '../application/use-cases/get-my-reservations.use-case';
import { CancelReservation } from '../application/use-cases/cancel-reservation-use.case';
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly createReservation: CreateReservation,
    private readonly finishReservation: FinishReservation,
    private readonly cancelReservation: CancelReservation,
    private readonly findMyReservations: GetMyReservations,
  ) {}
  @Post()
  @Roles('CUSTOMER')
  create(@Req() req: ExpressRequest, @Body() dto: CreateReservationDTO) {
    return this.createReservation.execute(dto, req.user!.id);
  }
  @Post(':id/finish')
  @Roles('CUSTOMER')
  finish(@Param('id') id: string) {
    return this.finishReservation.execute(id);
  }
  @Post(':id/cancel')
  @Roles('CUSTOMER')
  cancel(@Req() req: ExpressRequest, @Param('id') id: string) {
    return this.cancelReservation.execute(id, req.user!.id);
  }
  @Get('/me')
  @Roles('CUSTOMER')
  getMyReservations(@Req() req: ExpressRequest) {
    return this.findMyReservations.execute(req.user!.id);
  }
}
