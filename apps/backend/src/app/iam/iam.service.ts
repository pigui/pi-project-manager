import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { SignInInput, SignUpInput } from './inputs';
import { User } from '../users/schemas';
import { SignUpCommand } from './cqrs/commands/impl';
import { AccessToken } from './models';
import { SignInCommand } from './cqrs/commands/impl/sign-in.command';

@Injectable()
export class IamService {
  constructor(private readonly commandBus: CommandBus) {}

  signUp(signUpInput: SignUpInput): Promise<User> {
    return this.commandBus.execute(new SignUpCommand(signUpInput));
  }

  signIn(signInInput: SignInInput): Promise<AccessToken> {
    return this.commandBus.execute(new SignInCommand(signInInput));
  }
}
