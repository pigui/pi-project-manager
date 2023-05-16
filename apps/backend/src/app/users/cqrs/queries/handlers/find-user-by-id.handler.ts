import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindUserByIdQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}
  async execute({ _id }: FindUserByIdQuery): Promise<User> {
    return await this.userModel.findById(_id);
  }
}
