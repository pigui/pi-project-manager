import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { UserCreatedEvent } from '../impl';
import { PubSub } from 'graphql-subscriptions';

@EventsHandler(UserCreatedEvent)
export class UserCreatedHandler implements IEventHandler<UserCreatedEvent> {
  constructor(public readonly pubSub: PubSub) {}
  handle({ user }: UserCreatedEvent): void {
    this.pubSub.publish('USER_CREATED', { userCreated: user });
  }
}
