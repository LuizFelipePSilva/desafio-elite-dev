import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RevokeShareLinkUseCase } from '../applications/use-cases/revoke-shared-link.use-case';
import { CreateShareLinkUseCase } from '../applications/use-cases/create-share-link.use-case';
import { UserRole } from 'src/modules/users/domain/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/infrastructure/guards/jwt-auth.guard';
import { RolesGuard } from 'src/shared/guards/roles.guard';
import { Roles } from 'src/shared/decorators/roles.decorator';
import { type Request as ExpressRequest } from 'express';
import { GetSharedTicketUseCase } from '../applications/use-cases/get-shared-ticket.use-case';

@ApiTags('Share Links')
@Controller('share-links')
export class ShareLinkController {
  constructor(
    private readonly createShareLink: CreateShareLinkUseCase,
    private readonly revokeShareLink: RevokeShareLinkUseCase,
    private readonly getSharedTicket: GetSharedTicketUseCase,
  ) {}

  @Post('tickets/:ticketId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  create(@Req() req: ExpressRequest, @Param('ticketId') ticketId: string) {
    return this.createShareLink.execute(ticketId, req.user!.id);
  }
  @Delete('tickets/:ticketId')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.CUSTOMER)
  revoke(@Req() req: ExpressRequest, @Param('ticketId') ticketId: string) {
    return this.revokeShareLink.execute(ticketId, req.user!.id);
  }

  @Get(':token')
  findByToken(@Param('token') token: string) {
    return this.getSharedTicket.execute(token);
  }
}
