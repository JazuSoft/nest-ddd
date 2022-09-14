import { DomainEvent } from './domain-event.model';

export interface EventBus {
  fireEvents(events: DomainEvent[]): void;
}
