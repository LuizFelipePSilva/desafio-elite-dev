import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsDate,
  IsNumber,
  IsEnum,
  IsPositive,
} from 'class-validator';
import { EventStatus } from '../../domain/event.entity';

export class UpdateEventDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @MinLength(8)
  title: string;

  @IsString()
  @MinLength(8)
  description: string;

  @IsString()
  externalId: string;

  @IsString()
  location: string;

  @Type(() => Date)
  @IsDate()
  eventDate: Date;

  @IsNumber()
  @IsPositive()
  capacity: number;

  @IsEnum(EventStatus)
  status: EventStatus;
}
