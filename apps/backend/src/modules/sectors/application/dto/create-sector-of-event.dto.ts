import { IsNumber, IsString } from 'class-validator';

export class CreateSectorDTO {
  @IsString()
  name: string;
  @IsNumber()
  price: number;
  @IsNumber()
  capacity: number;
  @IsString()
  eventId: string;
}
