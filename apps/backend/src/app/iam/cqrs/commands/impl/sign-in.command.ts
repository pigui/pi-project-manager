import { IQuery } from '@nestjs/cqrs';
import { SignInInput } from '../../../inputs';

export class SignInCommand implements IQuery {
  constructor(public readonly signInInput: SignInInput) {}
}
