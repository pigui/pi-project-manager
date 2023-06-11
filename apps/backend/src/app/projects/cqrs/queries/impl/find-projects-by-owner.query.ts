import { IQuery } from '@nestjs/cqrs';
import { User } from '../../../../users/schemas';
import { Types } from 'mongoose';

export class FindProjectsByOwnerQuery implements IQuery {
  constructor(public readonly user: User & { _id: Types.ObjectId }) {}
}
