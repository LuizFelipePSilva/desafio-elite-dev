import { IsEnum, IsString } from 'class-validator';
import { PaymentMethod } from 'src/modules/payments/domain/entities/payment.entity';

export class CreateReservationDTO {
  @IsString()
  eventId: string;
  @IsString()
  sectorId: string;

  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}
