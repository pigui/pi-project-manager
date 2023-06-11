import { GraphqlTypes } from '@common/graphql';

export class SignInInput implements GraphqlTypes.SignInInput {
  email: string;
  password: string;
  constructor(data?: Partial<GraphqlTypes.SignInInput>) {
    const { email, password } = data;
    this.email = email || undefined;
    this.password = password || undefined;
  }
}
