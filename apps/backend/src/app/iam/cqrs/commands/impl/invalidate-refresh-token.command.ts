import { ICommand } from '@nestjs/cqrs';

export class InvalidateRefreshTokenCommand implements ICommand {
  constructor(public userId: string, public logout = false) {}
}
