import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { ProjectsService } from './projects.service';
import { CreateProjectInput, FindProjectByIdInput } from './inputs';
import { ActiveUser } from '../iam/decorators';
import { User } from '../users/schemas';
import { PubSub } from 'graphql-subscriptions';
import { Types } from 'mongoose';

@Resolver()
export class ProjectsResolver {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly pubSub: PubSub
  ) {}

  @Query('findProjects')
  findProjects() {
    return this.projectsService.findProjects();
  }

  @Query('findProjectById')
  findProjectById(@Args('findProjectByIdInput') { _id }: FindProjectByIdInput) {
    return this.projectsService.findProjectById(_id);
  }

  @Query('findMyProjects')
  findMyProjects(@ActiveUser() user: User & { _id: Types.ObjectId }) {
    return this.projectsService.findProjectByOwner(user);
  }

  @Mutation('createProject')
  createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @ActiveUser() user: User & { _id: Types.ObjectId }
  ) {
    return this.projectsService.createProject(createProjectInput, user);
  }

  @Subscription('projectCreated')
  userCreated() {
    return this.pubSub.asyncIterator('PROJECT_CREATED');
  }
}
