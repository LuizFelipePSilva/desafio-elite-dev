import { plainToInstance } from 'class-transformer';
import { IsString, IsNumber, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsNumber() PORT: number;

  @IsString() DB_HOST: string;
  @IsNumber() DB_PORT: number;
  @IsString() DB_USER: string;
  @IsString() DB_PASS: string;
  @IsString() DB_NAME: string;

  @IsString() REDIS_HOST: string;
  @IsNumber() REDIS_PORT: number;
  @IsString() REDIS_PASS: string;

  @IsString() REDIS_LOCK_HOST: string;
  @IsNumber() REDIS_LOCK_PORT: number;
  @IsString() REDIS_LOCK_PASS: string;

  @IsString() PEPPER: string;

  @IsString() JWT_ACCESS_SECRET: string;
  @IsString() JWT_ACCESS_EXPIRES_IN: string;

  @IsString() JWT_REFRESH_SECRET: string;
  @IsString() JWT_REFRESH_EXPIRES_IN: string;
}

export function validate(config: Record<string, unknown>) {
  const validated = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validated, { skipMissingProperties: false });
  if (errors.length > 0) throw new Error(errors.toString());
  return validated;
}
