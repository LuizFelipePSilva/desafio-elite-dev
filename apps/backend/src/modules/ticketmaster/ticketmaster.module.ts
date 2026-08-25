import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { TicketmasterClient } from './ticketmaster.client';
import { TicketmasterMapper } from './ticketmaster.mapper';
import { TicketmasterService } from './ticketmaster.service';
import { TicketmasterController } from './ticketmaster.controller';

@Module({
  imports: [HttpModule],
  controllers: [TicketmasterController],
  providers: [TicketmasterClient, TicketmasterMapper, TicketmasterService],
  exports: [TicketmasterService],
})
export class TicketmasterModule {}
