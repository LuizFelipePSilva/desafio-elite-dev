import { Payment, PaymentStatus } from '../entities/payment.entity';

export const PAYMENT_REPOSITORY = 'PAYMENT_REPOSITORY';

export interface IPaymentRepository {
  create(data: Partial<Payment>): Promise<Payment>;
  findById(id: string): Promise<Payment | null>;
  findByReservationId(reservationId: string): Promise<Payment | null>;
  updateStatus(id: string, status: PaymentStatus): Promise<Payment | null>;
}
