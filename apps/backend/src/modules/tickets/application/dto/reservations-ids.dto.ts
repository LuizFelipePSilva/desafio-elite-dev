import { IsArray, ArrayMaxSize, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ReservationsIds {
  @Transform(({ value }) =>
    Array.isArray(value) ? value : String(value).split(','),
  )
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  reservationsIds: string[];
}
