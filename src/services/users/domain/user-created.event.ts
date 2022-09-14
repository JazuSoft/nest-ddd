import { DomainEvent } from '@src/shared/domain/domain-event.model';

export class UserCreatedEvent extends DomainEvent {
  constructor(public id: string) {
    super();
    this.eventName = 'user.created';
  }
}
