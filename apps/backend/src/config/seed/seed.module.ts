import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { SeedService } from './seed.service';
import { EventsModule } from 'src/modules/events/events.module';

@Module({
  imports: [UsersModule, EventsModule],
  providers: [SeedService],
})
export class SeedModule {}
