import { Module } from '@nestjs/common';
import { UsersModule } from '@src/services/users/users.module';
import { SharedModule } from '@src/shared/shared.module';
import { LoginController } from './auth/login.controller';
import { UserCreatorController } from './users/create.controller';
import { UserSearcherController } from './users/searcher.controller';

@Module({
  imports: [SharedModule, UsersModule],
  controllers: [LoginController, UserCreatorController, UserSearcherController],
  providers: [],
})
export class ControllersModule {}
