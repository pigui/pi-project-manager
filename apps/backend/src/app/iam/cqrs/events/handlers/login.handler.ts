import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LoginEvent } from '../impl';
import { PubSub } from 'graphql-subscriptions';

@EventsHandler(LoginEvent)
export class LoginHandler implements IEventHandler<LoginEvent> {
  constructor(private readonly pubSub: PubSub) {}
  handle({ userId }: LoginEvent): void {
    this.pubSub.publish('LOGIN', { userLogin: userId });
  }
}
