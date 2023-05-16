import { IEvent } from '@nestjs/cqrs';

export class LogoutEvent implements IEvent {
  constructor(public userId: string) {}
}
