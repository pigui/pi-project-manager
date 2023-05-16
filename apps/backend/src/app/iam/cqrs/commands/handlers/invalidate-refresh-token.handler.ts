import { CommandHandler, EventBus, ICommandHandler } from '@nestjs/cqrs';
import { InvalidateRefreshTokenCommand } from '../impl/invalidate-refresh-token.command';
import {
  InvalidatedRefreshTokenError,
  RefreshTokenIdsStorage,
} from '../../../refresh-token-ids.storage';
import { UnauthorizedException } from '@nestjs/common';
import { LogoutEvent } from '../../events/impl';

@CommandHandler(InvalidateRefreshTokenCommand)
export class InvalidateRefreshTokenHandler
  implements ICommandHandler<InvalidateRefreshTokenCommand>
{
  constructor(
    private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
    private readonly eventBus: EventBus
  ) {}
  async execute({
    userId,
    logout,
  }: InvalidateRefreshTokenCommand): Promise<void> {
    try {
      await this.refreshTokenIdsStorage.invalidate(userId);
      if (logout) {
        this.eventBus.publish(new LogoutEvent(userId));
      }
    } catch (err) {
      if (err instanceof InvalidatedRefreshTokenError) {
        throw new UnauthorizedException('Access denied');
      }
      throw new UnauthorizedException();
    }
  }
}
