import { Inject, Injectable } from '@nestjs/common';
import { SERVICES_IMPORT_NAMES } from '@src/config/service-provider';
import { EventBus } from '@src/shared/domain/event-bus';
import { UsersRepository } from '@src/shared/domain/users/users-repository';
import { UserModel } from '../../../../shared/domain/users/user.model';
import { CreateUserDTO } from './create-user.request';
import * as bcrypt from 'bcrypt';
import { authConstants } from '@src/config/auth.config';

const UserRepoImple = () => Inject(SERVICES_IMPORT_NAMES.USER_REPOSITORY);
const EventBusImple = () => Inject(SERVICES_IMPORT_NAMES.EVENT_BUS);

@Injectable()
export class UserCreator {
  constructor(
    @UserRepoImple() private usersRespository: UsersRepository,
    @EventBusImple() private eventBus: EventBus,
  ) {}

  public async dispatch(createUser: CreateUserDTO) {
    const hash = await bcrypt.hash(createUser.password, authConstants.hashSalt);
    const user: UserModel = UserModel.create(
      createUser.id,
      createUser.username,
      hash,
    );
    await this.usersRespository.create(user);

    this.eventBus.fireEvents(await user.pullDomainEvents());
  }
}
