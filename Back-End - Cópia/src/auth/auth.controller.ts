import { Controller, Post, Body, UnauthorizedException, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { RegisterAuthDto } from './dto/register-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard) // Para obter token
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
