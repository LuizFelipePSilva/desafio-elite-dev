import { ConflictException, Inject, Injectable } from '@nestjs/common';
import {
  type IReservationRepository,
  RESERVATION_REPOSITORY,
} from '../../domain/repositories/reservation.repository.interface';
import { CreateReservationDTO } from '../dto/create-reservation.dto';
import { FindEventByIdUseCase } from 'src/modules/events/application/use-cases/find-event-by-id.use-case';
import { FindSectorById } from 'src/modules/sectors/application/use-cases/find-sector-by-id.use-case';
import { CreatePayment } from 'src/modules/payments/application/use-cases/create-payment.use-case';

@Injectable()
export class CreateReservation {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly reservationRepository: IReservationRepository,
    private readonly createPayment: CreatePayment,
    private readonly findEventyById: FindEventByIdUseCase,
    private readonly findSector: FindSectorById,
  ) {}

  async execute(dto: CreateReservationDTO, userId: string) {
    const event = await this.findEventyById.execut(dto.eventId);
    if (event.status !== 'OPEN')
      throw new ConflictException('Evento não está aberta a reservas');

    const sector = await this.findSector.execute(dto.sectorId);

    if (sector.availableQuantity <= 0) {
      throw new ConflictException('Quantidade indisponivel de ingresso');
    }
    const dateMore5Minutes = new Date(Date.now() + 5 * 60 * 1000);

    const reservation = await this.reservationRepository.create({
      eventId: dto.eventId,
      status: 'PENDING',
      sectorId: dto.sectorId,
      userId: userId,
      expiresAt: dateMore5Minutes,
    });

    await this.createPayment.execute({
      amount: sector.price,
      method: dto.method,
      reservationId: reservation.id,
    });

    return reservation;
  }
}
