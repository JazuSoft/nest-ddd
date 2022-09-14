import { Module } from '@nestjs/common';
import { UsersModule } from '@src/services/users/users.module';
import { SharedModule } from '@src/shared/shared.module';
import { LoginController } from './auth/login.controller';
import { RegisterController } from './users/create.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [SharedModule, UsersModule],
  controllers: [LoginController, RegisterController, UsersController],
  providers: [],
})
export class ControllersModule {}
