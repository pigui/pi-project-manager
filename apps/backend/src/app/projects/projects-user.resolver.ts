import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Project } from './schemas';
import { UsersService } from '../users/users.service';

@Resolver('Project')
export class ProjectsUserResolver {
  constructor(private readonly usersService: UsersService) {}
  @ResolveField('owner')
  getOwnerOfProject(@Parent() project: Project) {
    return this.usersService.findUserById(project.owner.toString());
  }

  @ResolveField('users')
  getUsersOfProject(@Parent() project: Project) {
    return this.usersService.findUsersById(
      project.users.map((user) => user.toString())
    );
  }
}
