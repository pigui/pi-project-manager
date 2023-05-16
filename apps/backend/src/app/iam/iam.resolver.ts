import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { IamService } from './iam.service';
import {
  LogoutInput,
  RefreshTokenInput,
  SignInInput,
  SignUpInput,
} from './inputs';
import { PubSub } from 'graphql-subscriptions';

@Resolver()
export class IamResolver {
  constructor(
    private readonly iamService: IamService,
    private readonly pubSub: PubSub
  ) {}

  @Mutation('signUp')
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.iamService.signUp(signUpInput);
  }

  @Mutation('signIn')
  signIn(@Args('signInInput') signInInput: SignInInput) {
    return this.iamService.signIn(signInInput);
  }

  @Mutation('refreshTokens')
  refreshTokens(
    @Args('refreshTokenInput') { refreshToken }: RefreshTokenInput
  ) {
    return this.iamService.refreshTokens(refreshToken);
  }

  @Mutation('logout')
  logout(@Args('logoutInput') { userId }: LogoutInput) {
    return this.iamService.logout(userId);
  }

  @Subscription('userLogout')
  userLogout() {
    return this.pubSub.asyncIterator('LOGOUT');
  }

  @Subscription('userLogin')
  userLogin() {
    return this.pubSub.asyncIterator('LOGIN');
  }

  @Subscription('userCreated')
  userCreated() {
    return this.pubSub.asyncIterator('USER_CREATED');
  }
}
