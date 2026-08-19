import { Controller, Post, Body } from '@nestjs/common';
import { CreateUserDto } from '../application/dto/create-user.dto';
import { CreateUserUseCase } from '../application/use-cases/create-user.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserResponseDto } from '../application/dto/user-response.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post()
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: 409,
    description: 'Email already registered',
  })
  create(@Body() dto: CreateUserDto) {
    return this.createUserUseCase.execute(dto);
  }
}
