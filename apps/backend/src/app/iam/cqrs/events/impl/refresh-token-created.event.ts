import { IEvent } from '@nestjs/cqrs';

export class RefreshTokenCreatedEvent implements IEvent {
  constructor(public userId: string, public refreshTokenId: string) {}
}
