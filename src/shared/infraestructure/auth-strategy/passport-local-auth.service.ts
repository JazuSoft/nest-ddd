import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PassportStrategy } from '@nestjs/passport';
import { authConstants } from '@src/config/auth.config';
import { SERVICES_IMPORT_NAMES } from '@src/config/service-provider';
import { UserModel } from '@src/shared/domain/users/user.model';
import { UsersRepository } from '@src/shared/domain/users/users-repository';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-local';
import * as bcrypt from 'bcrypt';

const UserRepo = () => Inject(SERVICES_IMPORT_NAMES.USER_REPOSITORY);

@Injectable()
export class PassportLocalAuthService extends PassportStrategy(Strategy) {
  constructor(
    @UserRepo() private usersRespository: UsersRepository,
    private jwtService: JwtService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConstants.secret,
    });
  }

  async login(user: UserModel) {
    const payload = { username: user.username(), sub: user.id() };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersRespository.findOne(username);
    const hash = await bcrypt.hash(pass, authConstants.hashSalt);
    const isMatch = user && (await bcrypt.compare(user.password(), hash));

    if (isMatch) {
      return user;
    }
    return null;
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
