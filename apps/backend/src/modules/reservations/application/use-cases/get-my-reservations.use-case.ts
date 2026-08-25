import { Inject, Injectable } from '@nestjs/common';
import {
  type IReservationRepository,
  RESERVATION_REPOSITORY,
} from '../../domain/repositories/reservation.repository.interface';
import { Reservation } from '../../domain/reservation.entity';

@Injectable()
export class GetMyReservations {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
  ) {}

  async execute(userId: string): Promise<Reservation[]> {
    return await this.reservationRepository.findByUserId(userId);
  }
}
