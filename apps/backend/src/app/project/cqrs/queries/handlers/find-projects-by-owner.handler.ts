import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProjectsByOwnerQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindProjectsByOwnerQuery)
export class FindProjectsByOwnerHandler
  implements IQueryHandler<FindProjectsByOwnerQuery>
{
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>
  ) {}
  async execute({ user }: FindProjectsByOwnerQuery): Promise<Project> {
    return await this.projectModel.findOne({ owner: user });
  }
}
