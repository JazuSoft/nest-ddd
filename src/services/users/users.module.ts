import { Module } from '@nestjs/common';
import { SharedModule } from '@src/shared/shared.module';
import { UserCreator } from './application/create/creator';
import { UserSearcher } from './application/search/searcher';
import { UserUpdater } from './application/update/updater';

@Module({
  imports: [SharedModule],
  providers: [UserUpdater, UserCreator, UserSearcher],
  exports: [UserCreator, UserUpdater, UserSearcher],
})
export class UsersModule {}
