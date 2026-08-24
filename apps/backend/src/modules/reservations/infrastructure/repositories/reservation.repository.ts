import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  Reservation,
  ReservationStatus,
} from '../../domain/reservation.entity';
import { IReservationRepository } from '../../domain/repositories/reservation.repository.interface';

@Injectable()
export class ReservationRepository implements IReservationRepository {
  constructor(
    @InjectRepository(Reservation)
    private readonly repo: Repository<Reservation>,
  ) {}

  create(data: Partial<Reservation>): Promise<Reservation> {
    const reservation = this.repo.create(data);
    return this.repo.save(reservation);
  }

  findById(id: string): Promise<Reservation | null> {
    return this.repo.findOneBy({ id });
  }

  findByUserId(userId: string): Promise<Reservation[]> {
    return this.repo.findBy({ userId });
  }

  countActiveBySector(
    sectorId: string,
    statuses: ReservationStatus[],
  ): Promise<number> {
    return this.repo
      .createQueryBuilder('r')
      .where('r.sectorId = :sectorId', { sectorId })
      .andWhere('r.status IN (:...statuses)', { statuses })
      .getCount();
  }

  async updateStatus(
    id: string,
    status: ReservationStatus,
  ): Promise<Reservation | null> {
    await this.repo.update(id, { status });
    return this.findById(id);
  }
}
