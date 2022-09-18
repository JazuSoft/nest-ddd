import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';
import { JzResponse } from '@src/shared/application/paginate-response.model copy';
import { PassportLocalAuthService } from '@src/shared/infraestructure/auth-strategy/passport-local-auth.service';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';

@Controller('users')
export class LoginController {
  constructor(private authService: PassportLocalAuthService) {}

  /**
   * Super hardcode bind to password jwt
   * @param req {username:"some", password: "other"}
   * @returns
   */
  @UseGuards(LocalAuthGuard)
  @Post('authenticate')
  async login(@Request() req) {
    const data = await this.authService.login(req.user);
    return new JzResponse<any>(data, HttpStatus.OK);
  }
}
