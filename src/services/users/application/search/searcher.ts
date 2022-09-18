import { Inject, Injectable } from '@nestjs/common';
import { SERVICES_IMPORT_NAMES } from '@src/config/service-provider';
import { EventBus } from '@src/shared/domain/event-bus';
import { UsersRepository } from '@src/shared/domain/users/users-repository';
import { User } from '../../../../shared/domain/users/user.model';
import * as bcrypt from 'bcrypt';
import { authConstants } from '@src/config/auth.config';
import { Filter } from '@src/shared/domain/filter.model';
import { JazuPaginate } from '@src/shared/domain/jazupaginate.model';

const UserRepoImple = () => Inject(SERVICES_IMPORT_NAMES.USER_REPOSITORY);
const EventBusImple = () => Inject(SERVICES_IMPORT_NAMES.EVENT_BUS);

@Injectable()
export class UserSearcher {
  constructor(
    @UserRepoImple() private usersRespository: UsersRepository,
    @EventBusImple() private eventBus: EventBus,
  ) {}

  public async ask(filter: Filter): Promise<JazuPaginate<User>> {
    return await this.usersRespository.search(filter);
  }
}
