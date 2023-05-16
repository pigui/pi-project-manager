import { IEvent } from '@nestjs/cqrs';
import { User } from '../../../../users/schemas';

export class UserCreatedEvent implements IEvent {
  constructor(public user: User) {}
}
