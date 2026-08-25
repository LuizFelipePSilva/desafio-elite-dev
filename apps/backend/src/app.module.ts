import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import typeormConfig from './config/typeorm.config';
import { redisCacheConfig, redisLockConfig } from './config/redis.config';
import { validate } from './config/env.validation';
import { RedisModule } from './redis/redis.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TicketmasterModule } from './modules/ticketmaster/ticketmaster.module';
import { SeedModule } from './config/seed/seed.module';
import { EventsModule } from './modules/events/events.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { SectorsModule } from './modules/sectors/sectors.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { ShareLinksModule } from './modules/share-links/share-links.module';
import { TicketsModule } from './modules/tickets/tickets.module';

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate,
      envFilePath: '../../.env',
      load: [typeormConfig, redisCacheConfig, redisLockConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.getOrThrow('typeorm'),
    }),
    RedisModule,
    UsersModule,
    AuthModule,
    TicketmasterModule,
    SeedModule,
    EventsModule,
    SectorsModule,
    PaymentsModule,
    ShareLinksModule,
    TicketsModule,
    ReservationsModule,
  ],
})
export class AppModule {}
