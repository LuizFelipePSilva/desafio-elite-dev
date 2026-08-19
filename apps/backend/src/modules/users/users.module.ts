import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UsersController } from './infrastructure/users.controller';
import { CreateUserUseCase } from './application/use-cases/create-user.use-case';
import { FindUserByEmailUseCase } from './application/use-cases/find-user-by-email.use-case';
import { FindUserByIdUseCase } from './application/use-cases/find-user-by-id.use-case';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [
    { provide: USER_REPOSITORY, useClass: UserRepository },
    CreateUserUseCase,
    FindUserByEmailUseCase,
    FindUserByIdUseCase,
  ],
  exports: [FindUserByEmailUseCase, FindUserByIdUseCase],
})
export class UsersModule {}
