export class DomainEvent {
  protected eventName = 'DomainEvent';

  getDomainName() {
    return this.eventName;
  }
}
