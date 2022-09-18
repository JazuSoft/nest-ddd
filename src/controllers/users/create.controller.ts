import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '@src/guards/jwt-auth.guard';
import { CreateUserDTO } from '@src/services/users/application/create/create-user.request';
import { UserCreator } from '@src/services/users/application/create/creator';

@Controller('users')
export class UserCreatorController {
  constructor(private userCreator: UserCreator) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async handle(@Body() createUser: CreateUserDTO): Promise<HttpStatus> {
    await this.userCreator.dispatch(createUser);
    return HttpStatus.OK;
  }
}
