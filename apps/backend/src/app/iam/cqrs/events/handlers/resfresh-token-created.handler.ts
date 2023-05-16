import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { RefreshTokenCreatedEvent } from '../impl';
import { RefreshTokenIdsStorage } from '../../../refresh-token-ids.storage';

@EventsHandler(RefreshTokenCreatedEvent)
export class RefreshTokenCreatedHandler
  implements IEventHandler<RefreshTokenCreatedEvent>
{
  constructor(
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage
  ) {}
  async handle({
    userId,
    refreshTokenId,
  }: RefreshTokenCreatedEvent): Promise<void> {
    await this.refreshTokenIdsStorage.insert(userId, refreshTokenId);
  }
}
