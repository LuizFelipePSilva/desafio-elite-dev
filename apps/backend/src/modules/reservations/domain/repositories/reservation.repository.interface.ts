import { Reservation, ReservationStatus } from '../reservation.entity';

export const RESERVATION_REPOSITORY = 'RESERVATION_REPOSITORY';

export interface IReservationRepository {
  create(data: Partial<Reservation>): Promise<Reservation>;
  findById(id: string): Promise<Reservation | null>;
  findByUserId(userId: string): Promise<Reservation[]>;
  countActiveBySector(
    sectorId: string,
    statuses: ReservationStatus[],
  ): Promise<number>;
  updateStatus(
    id: string,
    status: ReservationStatus,
  ): Promise<Reservation | null>;
}
