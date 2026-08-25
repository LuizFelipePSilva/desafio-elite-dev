import { Reservation } from 'src/modules/reservations/domain/reservation.entity';
import { Sector } from 'src/modules/sectors/domain/entities/sector.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export const EventStatus = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  MAINTENACE: 'MAINTENACE',
} as const;

export type EventStatus = (typeof EventStatus)[keyof typeof EventStatus];

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  externalId: string;

  @Column()
  location: string;

  @Column('date')
  eventDate: Date;

  @Column()
  capacity: number;

  @Column({
    type: 'enum',
    enum: Object.values(EventStatus),
  })
  status: EventStatus;

  @OneToMany(() => Sector, (sector) => sector.event, { onDelete: 'CASCADE' })
  sector: Sector[];

  @OneToMany(() => Reservation, (reservation) => reservation.event, {
    onDelete: 'CASCADE',
  })
  reservation: Reservation[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;
}
