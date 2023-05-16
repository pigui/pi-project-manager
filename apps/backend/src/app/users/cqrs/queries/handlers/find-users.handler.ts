import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindUsersQuery)
export class FindUsersHandler implements IQueryHandler<FindUsersQuery> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
  async execute(): Promise<User[]> {
    return await this.userModel.find();
  }
}
