import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  type IReservationRepository,
  RESERVATION_REPOSITORY,
} from '../../domain/repositories/reservation.repository.interface';
import { Reservation } from '../../domain/reservation.entity';

@Injectable()
export class FindReservationByIdUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
  ) {}

  async execute(id: string): Promise<Reservation> {
    const reservation = await this.reservationRepository.findById(id);
    if (!reservation) {
      throw new NotFoundException('Reserva não encontrada');
    }
    return reservation;
  }
}
