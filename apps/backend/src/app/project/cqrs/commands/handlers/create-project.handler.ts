import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProjectCommand } from '../impl';
import { InjectModel } from '@nestjs/mongoose';
import { Project, ProjectDocument } from '../../../schemas';
import { Model } from 'mongoose';

@CommandHandler(CreateProjectCommand)
export class CreateProjectHandler
  implements ICommandHandler<CreateProjectCommand>
{
  constructor(
    @InjectModel(Project.name) private readonly projectModel: Model<Project>
  ) {}
  async execute({
    createProjectInput,
    user,
  }: CreateProjectCommand): Promise<Project> {
    const project: ProjectDocument = new this.projectModel({
      ...createProjectInput,
    });
    project.owner = user;
    await project.save();
    return project;
  }
}
