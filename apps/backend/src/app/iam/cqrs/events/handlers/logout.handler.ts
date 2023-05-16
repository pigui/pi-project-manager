import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { LogoutEvent } from '../impl';
import { PubSub } from 'graphql-subscriptions';

@EventsHandler(LogoutEvent)
export class LogoutHandler implements IEventHandler<LogoutEvent> {
  constructor(private readonly pubSub: PubSub) {}
  handle({ userId }: LogoutEvent): void {
    this.pubSub.publish('LOGOUT', { userLogout: userId });
  }
}
