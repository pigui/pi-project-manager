import { GraphqlTypes } from '@common/graphql';

export class SignInInput implements GraphqlTypes.SignInInput {
  email: string;
  password: string;
  constructor(data?: Partial<GraphqlTypes.SignInInput>) {
    Object.assign(this, data);
  }
}
