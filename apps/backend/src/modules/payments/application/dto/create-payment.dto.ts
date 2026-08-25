import { PaymentMethod } from '../../domain/entities/payment.entity';

export class CreatePaymentDTO {
  reservationId: string;
  amount: number;
  method: PaymentMethod;
}
