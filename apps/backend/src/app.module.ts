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
  ],
})
export class AppModule {}
