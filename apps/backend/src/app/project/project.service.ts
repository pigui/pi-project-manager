import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProjectInput } from './inputs';
import { CreateProjectCommand } from './cqrs/commands/impl';
import { Project } from './schemas';
import { User } from '../users/schemas';
import {
  FindProjectByIdQuery,
  FindProjectsByOwnerQuery,
  FindProjectsQuery,
} from './cqrs/queries/impl';

@Injectable()
export class ProjectService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {}

  createProject(
    createProjectInput: CreateProjectInput,
    user: User
  ): Promise<Project> {
    return this.commandBus.execute(
      new CreateProjectCommand(createProjectInput, user)
    );
  }

  findProjects(): Promise<Project[]> {
    return this.queryBus.execute(new FindProjectsQuery());
  }

  findProjectById(_id: string): Promise<Project> {
    return this.queryBus.execute(new FindProjectByIdQuery(_id));
  }

  findProjectByOwner(user: User): Promise<Project[]> {
    return this.queryBus.execute(new FindProjectsByOwnerQuery(user));
  }
}
