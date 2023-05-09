import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SignInCommand } from '../impl/sign-in.command';

@CommandHandler(SignInCommand)
export class SignInHandler implements ICommandHandler<SignInCommand> {
  execute(command: SignInCommand): Promise<any> {
    throw new Error('Method not implemented.');
  }
}
