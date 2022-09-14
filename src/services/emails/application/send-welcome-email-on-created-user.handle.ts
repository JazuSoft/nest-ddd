import { OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from '@src/services/users/domain/user-created.event';

export class SendWelcomeEmailOnCreatedUser {
  @OnEvent('user.created', { async: true })
  handle(payload: UserCreatedEvent) {
    // handle and process "OrderCreatedEvent" event
  }
}
