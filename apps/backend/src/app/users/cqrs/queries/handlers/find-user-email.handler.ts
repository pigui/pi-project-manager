import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByEmailQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindUserByEmailQuery)
export class FindUserByEmailHandler
  implements IQueryHandler<FindUserByEmailQuery>
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
  async execute({ email }: FindUserByEmailQuery): Promise<User> {
    return await this.userModel.findOne({ email });
  }
}
