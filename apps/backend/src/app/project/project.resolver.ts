import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ProjectService } from './project.service';
import { CreateProjectInput, FindProjectByIdInput } from './inputs';
import { ActiveUser } from '../iam/decorators';
import { User } from '../users/schemas';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class ProjectResolver {
  constructor(
    private readonly projectService: ProjectService,
    private readonly pubSub: PubSub
  ) {}

  @Query('findProjects')
  findProjects() {
    return this.projectService.findProjects();
  }

  @Query('findProjectById')
  findProjectById(@Args('findProjectByIdInput') { _id }: FindProjectByIdInput) {
    return this.projectService.findProjectById(_id);
  }

  @Query('findMyProjects')
  findMyProjects(@ActiveUser() user: User) {
    return this.projectService.findProjectByOwner(user);
  }

  @Mutation('createProject')
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @ActiveUser() user: User
  ) {
    return this.projectService.createProject(createProjectInput, user);
  }

  @Subscription('projectCreated')
  userCreated() {
    return this.pubSub.asyncIterator('PROJECT_CREATED');
  }
}
