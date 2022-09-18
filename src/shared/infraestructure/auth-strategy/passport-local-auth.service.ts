import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { authConstants } from '@src/config/auth.config';
import { SERVICES_IMPORT_NAMES } from '@src/config/service-provider';
import { User } from '@src/shared/domain/users/user.model';
import { UsersRepository } from '@src/shared/domain/users/users-repository';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';
import { RoleResponse } from '@src/shared/application/role-response.model';

const UserRepo = () => Inject(SERVICES_IMPORT_NAMES.USER_REPOSITORY);

@Injectable()
export class PassportLocalAuthService extends PassportStrategy(Strategy) {
  constructor(
    @UserRepo() private usersRespository: UsersRepository,
    private jwtService: JwtService,
  ) {
    super();
  }

  async login(user: User) {
    const payload = { email: user.email(), sub: user.id() };
    return {
      token: this.jwtService.sign(payload),
      id: user.id(),
      email: user.email(),
      lastname: user.lastname(),
      firstname: user.firstname(),
      photo: user.photo(),
      roles: user.roles().map((x) => RoleResponse.fromDomain(x)),
    };
  }

  private async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersRespository.findOne(email);
    const isMatch = user && (await bcrypt.compare(pass, user.password()));

    if (isMatch) {
      return user;
    }
    return null;
  }

  async validate(email: string, password: string): Promise<any> {
    const user = await this.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
