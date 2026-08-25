import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sector } from '../../domain/entities/sector.entity';
import { ISectorRepository } from '../../domain/repositories/sector.repository.interface';

@Injectable()
export class SectorRepository implements ISectorRepository {
  constructor(
    @InjectRepository(Sector)
    private readonly repo: Repository<Sector>,
  ) {}

  create(data: Partial<Sector>): Promise<Sector> {
    const sector = this.repo.create(data);
    return this.repo.save(sector);
  }

  findById(id: string): Promise<Sector | null> {
    return this.repo.findOneBy({ id });
  }

  async findByEventId(
    eventId: string,
    page: number,
    limit: number,
  ): Promise<{ data: Sector[]; total: number }> {
    const [data, total] = await this.repo.findAndCount({
      where: { eventId },
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total };
  }
  async update(id: string, data: Partial<Sector>): Promise<Sector | null> {
    await this.repo.update(id, data);
    return this.findById(id);
  }
  async delete(id: string): Promise<void> {
    await this.repo.softDelete(id);
  }
}
