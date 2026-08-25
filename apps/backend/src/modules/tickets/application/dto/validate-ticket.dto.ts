import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class ValidateTicketDTO {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsUUID()
  eventId: string;
}
