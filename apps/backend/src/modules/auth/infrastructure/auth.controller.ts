import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Authenticate user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User authenticated successfully',
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'Invalid credentials',
  })
  login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}
