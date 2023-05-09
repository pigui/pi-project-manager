import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { IamService } from './iam.service';
import { SignInInput, SignUpInput } from './inputs';

@Resolver()
export class IamResolver {
  constructor(private readonly iamService: IamService) {}

  @Mutation('signUp')
  signUp(@Args('signUpInput') signUpInput: SignUpInput) {
    return this.iamService.signUp(signUpInput);
  }

  @Mutation('signIn')
  signIn(@Args('signIn') signInInput: SignInInput) {
    return this.iamService.signIn(signInInput);
  }
}
