import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUsersByIdsQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindUsersByIdsQuery)
export class FindUsersByIdsHandler
  implements IQueryHandler<FindUsersByIdsQuery>
{
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
  async execute({ _ids }: FindUsersByIdsQuery): Promise<User[]> {
    return await this.userModel.find({ _id: { $in: _ids } });
  }
}
