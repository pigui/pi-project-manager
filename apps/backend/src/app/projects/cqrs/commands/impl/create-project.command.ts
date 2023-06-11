import { ICommand } from '@nestjs/cqrs';
import { CreateProjectInput } from '../../../inputs';
import { User } from '../../../../users/schemas';
import { Types } from 'mongoose';

export class CreateProjectCommand implements ICommand {
  constructor(
    public readonly createProjectInput: CreateProjectInput,
    public readonly user: User & { _id: Types.ObjectId }
  ) {}
}
