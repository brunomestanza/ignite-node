import { vi } from 'vitest'
import { AggregateRoot } from '../entities/aggregate-root'
import { DomainEvent } from '../events/domain-event'
import { DomainEvents } from '../events/domain-events'
import { UniqueEntityID } from '../value-objects/unique-entity-id'

class CustomAggregateCreated implements DomainEvent {
  private aggregate: CustomAggregate // eslint-disable-line
  public ocurredAt: Date
  public getAggregateId(): UniqueEntityID {
    return this.aggregate.id
  }

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate
    this.ocurredAt = new Date()
  }
}

class CustomAggregate extends AggregateRoot<any> {
  static create() {
    const aggregate = new CustomAggregate(null)

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate))

    return aggregate
  }
}

describe('Domain events', () => {
  it('should be able to dispatch and list to events', () => {
    // Fake function to test if the subscriber function is called
    const callbackSpy = vi.fn()

    // Subscriber is added to the domain events list, but not called yet
    DomainEvents.register(callbackSpy, CustomAggregateCreated.name)

    // Something is created, but isn't saved in the database
    const aggregate = CustomAggregate.create()

    // Secure that the event is created, but not dispatched
    expect(aggregate.domainEvents).toHaveLength(1)

    // Saving the data in the database, and dispatching the event
    DomainEvents.dispatchEventsForAggregate(aggregate.id)

    // Secure that the function is called after saving in the database
    expect(callbackSpy).toHaveBeenCalled()
    // Secure that the list of domain events in now empty, because the event was dispatched
    expect(aggregate.domainEvents).toHaveLength(0)
  })
})
