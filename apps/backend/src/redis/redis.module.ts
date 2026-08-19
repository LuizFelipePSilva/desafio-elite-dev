import { Module, Global } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import { redisCacheConfig, redisLockConfig } from '../config/redis.config';

export const REDIS_CACHE = 'REDIS_CACHE';
export const REDIS_LOCK = 'REDIS_LOCK';

@Global()
@Module({
  imports: [
    ConfigModule.forFeature(redisCacheConfig),
    ConfigModule.forFeature(redisLockConfig),
  ],
  providers: [
    {
      provide: REDIS_CACHE,
      inject: [redisCacheConfig.KEY],
      useFactory: (cfg: ConfigType<typeof redisCacheConfig>) => new Redis(cfg),
    },
    {
      provide: REDIS_LOCK,
      inject: [redisLockConfig.KEY],
      useFactory: (cfg: ConfigType<typeof redisLockConfig>) => new Redis(cfg),
    },
  ],
  exports: [REDIS_CACHE, REDIS_LOCK],
})
export class RedisModule {}
