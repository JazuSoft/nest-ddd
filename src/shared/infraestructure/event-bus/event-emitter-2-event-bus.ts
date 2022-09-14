import { EventEmitter2 } from '@nestjs/event-emitter';
import { DomainEvent } from '../../domain/domain-event.model';
import { EventBus } from '../../domain/event-bus';

export class EventEmitter2EventBus implements EventBus {
  constructor(private eventEmitter: EventEmitter2) {}

  fireEvents(events: DomainEvent[]): void {
    events.forEach(async (event: DomainEvent) => {
      this.fire(event);
    });
  }

  private fire(event: DomainEvent): void {
    this.eventEmitter.emit(event.getDomainName(), event);
  }
}
