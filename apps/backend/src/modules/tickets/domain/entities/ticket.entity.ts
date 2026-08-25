import { Reservation } from 'src/modules/reservations/domain/reservation.entity';
import { User } from 'src/modules/users/domain/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const TicketStatus = {
  VALID: 'VALID',
  USED: 'USED',
  CANCELLED: 'CANCELLED',
} as const;

export type TicketStatus = (typeof TicketStatus)[keyof typeof TicketStatus];

@Entity('tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  reservationId: string;

  @Column({ unique: true })
  ticketCode: string;

  @Column('text')
  qrCode: string;

  @Column({
    type: 'enum',
    enum: Object.values(TicketStatus),
    default: TicketStatus.VALID,
  })
  status: TicketStatus;

  @Column({ type: 'timestamp', nullable: true })
  validatedAt: Date | null;

  @Column({ nullable: true })
  validatedByUserId: string | null;

  @OneToOne(() => Reservation, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'reservationId' })
  reservation: Reservation;

  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'validatedByUserId' })
  validatedBy: User | null;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
