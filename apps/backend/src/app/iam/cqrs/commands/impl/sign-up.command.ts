import { ICommand } from '@nestjs/cqrs';
import { SignUpInput } from '../../../inputs';
export class SignUpCommand implements ICommand {
  constructor(public readonly signUpInput: SignUpInput) {}
}
