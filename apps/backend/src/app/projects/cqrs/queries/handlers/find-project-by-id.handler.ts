import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProjectByIdQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindProjectByIdQuery)
export class FindProjectByIdHandler
  implements IQueryHandler<FindProjectByIdQuery>
{
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>
  ) {}
  async execute({ _id }: FindProjectByIdQuery): Promise<Project> {
    return await this.projectModel.findById(_id);
  }
}
