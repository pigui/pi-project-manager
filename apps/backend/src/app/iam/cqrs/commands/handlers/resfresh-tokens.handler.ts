import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RefreshTokensCommand } from '../impl';

@CommandHandler(RefreshTokensCommand)
export class RefreshTokensHandler
  implements ICommandHandler<RefreshTokensCommand>
{
  execute(command: RefreshTokensCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
