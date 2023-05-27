import { IQuery } from '@nestjs/cqrs';
import { User } from '../../../../users/schemas';

export class FindProjectsByOwnerQuery implements IQuery {
  constructor(public readonly user: User) {}
}
