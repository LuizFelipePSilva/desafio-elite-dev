import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payment, PaymentStatus } from '../../domain/entities/payment.entity';
import { IPaymentRepository } from '../../domain/repositories/payment.repository.interface';

@Injectable()
export class PaymentRepository implements IPaymentRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly repo: Repository<Payment>,
  ) {}

  create(data: Partial<Payment>): Promise<Payment> {
    const payment = this.repo.create(data);
    return this.repo.save(payment);
  }

  findById(id: string): Promise<Payment | null> {
    return this.repo.findOneBy({ id });
  }

  findByReservationId(reservationId: string): Promise<Payment | null> {
    return this.repo.findOneBy({ reservationId });
  }

  async updateStatus(
    id: string,
    status: PaymentStatus,
  ): Promise<Payment | null> {
    await this.repo.update(id, { status });
    return this.findById(id);
  }
}
