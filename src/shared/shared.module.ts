import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { authConstants } from '@src/config/auth.config';
import {
  EventBusProvider,
  UserRepositoryProvider,
} from '@src/config/service-provider';
import { PassportJwtAuthService } from './infraestructure/auth-strategy/passport-jwt-auth.service';
import { PassportLocalAuthService } from './infraestructure/auth-strategy/passport-local-auth.service';
import {
  MongoUser,
  MongoUserSchema,
} from './infraestructure/users/mongo-user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MongoUser.name, schema: MongoUserSchema },
    ]),
    PassportModule,
    JwtModule.register({
      secret: authConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [
    EventBusProvider,
    PassportLocalAuthService,
    PassportJwtAuthService,
    UserRepositoryProvider,
  ],
  exports: [
    EventBusProvider,
    PassportLocalAuthService,
    PassportJwtAuthService,
    UserRepositoryProvider,
  ],
})
export class SharedModule {}
