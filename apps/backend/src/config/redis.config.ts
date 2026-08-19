import { registerAs } from '@nestjs/config';

export const redisCacheConfig = registerAs('redisCache', () => ({
  host: process.env.REDIS_HOST,
  port: parseInt(process.env.REDIS_PORT || '9999', 10),
  password: process.env.REDIS_PASS,
}));

export const redisLockConfig = registerAs('redisLock', () => ({
  host: process.env.REDIS_LOCK_HOST,
  port: parseInt(process.env.REDIS_LOCK_PORT || '9999', 10),
  password: process.env.REDIS_LOCK_PASS,
}));
