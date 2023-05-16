import { Args, Query, Resolver } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { FindUserByEmailInput, FindUserByIdInput } from './inputs';

@Resolver()
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query('findUsers')
  findUsers() {
    return this.usersService.findUsers();
  }

  @Query('findUserById')
  findUserById(@Args('findUserByIdInput') { _id }: FindUserByIdInput) {
    return this.usersService.findUserById(_id);
  }

  @Query('findUserByEmail')
  findUserByEmail(
    @Args('findUserByEmailInput') { email }: FindUserByEmailInput
  ) {
    return this.usersService.findUserById(email);
  }
}
