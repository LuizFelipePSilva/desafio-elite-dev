import { Inject, Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User, UserRole } from '../../domain/entities/user.entity';
import {
  type IUserRepository,
  USER_REPOSITORY,
} from '../../domain/repositories/user.repository.interface';
import { CreateUserDto } from '../dto/create-user.dto';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(dto: CreateUserDto): Promise<User> {
    const exists = await this.userRepository.findByEmail(dto.email);
    if (exists) throw new ConflictException('Email já está sendo usado');

    const passwordBuffer = Buffer.from(dto.password, 'utf8');
    const confirmBuffer = Buffer.from(dto.confirm_password, 'utf8');

    if (
      passwordBuffer.length !== confirmBuffer.length ||
      !timingSafeEqual(passwordBuffer, confirmBuffer)
    ) {
      throw new ConflictException('Senha não coincidem');
    }

    const hashed = await bcrypt.hash(dto.password + process.env.PEPPER, 12);

    const user = this.userRepository.create({
      name: dto.name,
      email: dto.email,
      password: hashed,
      role: UserRole.CUSTOMER,
    });
    return user;
  }
}
