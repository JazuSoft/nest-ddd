import { DomainEvent } from './domain-event.model';

export class AggregateRoot {
  constructor() {
    this.domainEvents = [];
  }

  private domainEvents: DomainEvent[];

  public async pullDomainEvents() {
    return this.domainEvents;
  }

  public async record(event: DomainEvent) {
    this.domainEvents.push(event);
  }
}
