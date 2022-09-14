import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { PassportLocalAuthService } from '@src/shared/infraestructure/auth-strategy/passport-local-auth.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('auth')
export class LoginController {
  constructor(private authService: PassportLocalAuthService) {}

  /**
   * Super hardcode bind to password jwt
   * @param req {username:"some", password: "other"}
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
