import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { FindProjectsQuery } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { Project } from '../../../schemas';
import { Model } from 'mongoose';

@QueryHandler(FindProjectsQuery)
export class FindProjectsHandler implements IQueryHandler<FindProjectsQuery> {
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>
  ) {}
  async execute(): Promise<Project[]> {
    return await this.projectModel.find();
  }
}
