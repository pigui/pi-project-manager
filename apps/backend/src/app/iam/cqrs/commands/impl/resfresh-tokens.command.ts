import { ICommand } from '@nestjs/cqrs';

export class RefreshTokensCommand implements ICommand {
  constructor(public resfreshToken: string) {}
}
