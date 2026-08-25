import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Get,
  UseGuards,
  Req,
} from '@nestjs/common';
import { LoginDto } from '../application/dto/login.dto';
import { LoginUseCase } from '../application/use-cases/login.use-case';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import type { Request as ExpressRequest, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

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
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const tokens = await this.loginUseCase.execute(dto);

    response.cookie('access_token', tokens.accessToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    response.cookie('refresh_token', tokens.refreshToken, {
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    return {
      message: 'Login efetuado com sucesso',
    };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req: ExpressRequest & { user: { sub: string; role: string } }) {
    return {
      id: req.user.sub,
      role: req.user.role,
    };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('refresh_token', {
      httpOnly: true,
      secure: false,
      sameSite: 'lax',
      path: '/',
    });
    return { message: 'Logout realizado com sucesso' };
  }
}
