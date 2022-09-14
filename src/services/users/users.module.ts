import { Module } from '@nestjs/common';
import { SharedModule } from '@src/shared/shared.module';
import { UserCreator } from './application/create/creator';
import { UserUpdater } from './application/update/updater';

@Module({
  imports: [SharedModule],
  providers: [UserUpdater, UserCreator],
  exports: [UserCreator, UserUpdater],
})
export class UsersModule {}
