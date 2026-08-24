import { Injectable } from '@nestjs/common';
import {
  IEventRepository,
  SearchParams,
} from '../../domain/repositories/event.repository.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Event } from '../../domain/event.entity';
import { Repository } from 'typeorm';
import { IEventPaginate } from '../../application/dto/event-paginate.dto';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectRepository(Event)
    private readonly repo: Repository<Event>,
  ) {}
  create(data: Partial<Event>): Promise<Event> {
    const event = this.repo.create(data);
    return this.repo.save(event);
  }
  findByExternalId(externalId: string): Promise<Event | null> {
    return this.repo.findOne({
      where: { externalId: externalId },
    });
  }
  findById(id: string): Promise<Event | null> {
    return this.repo.findOne({
      where: { id: id },
    });
  }
  update(id: string, data: Partial<Event>): Promise<Event> {
    return this.repo.save({ id, ...data });
  }
  async findAll(searchParams: SearchParams): Promise<IEventPaginate> {
    const { limit, page } = searchParams;

    const query = this.repo.createQueryBuilder('events');

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    const result: IEventPaginate = {
      per_page: limit,
      data,
      total,
      current_page: page,
      last_page: Math.ceil(total / limit),
    };

    return result;
  }
  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
