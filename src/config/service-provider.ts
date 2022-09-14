import { Provider } from '@nestjs/common';
import { EventEmitter2EventBus } from '@src/shared/infraestructure/event-bus/event-emitter-2-event-bus';
import { MongoUsersRepository } from '@src/shared/infraestructure/users/mongo-users-repository';

export const SERVICES_IMPORT_NAMES = {
  USER_REPOSITORY: 'UserRepository',
  EVENT_BUS: 'EventBus',
};

export const UserRepositoryProvider: Provider = {
  provide: SERVICES_IMPORT_NAMES.USER_REPOSITORY,
  useClass: MongoUsersRepository,
};

export const EventBusProvider: Provider = {
  provide: SERVICES_IMPORT_NAMES.EVENT_BUS,
  useClass: EventEmitter2EventBus,
};
