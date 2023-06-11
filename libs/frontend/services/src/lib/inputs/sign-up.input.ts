import { GraphqlTypes } from '@common/graphql';

export class SignUpInput implements GraphqlTypes.SignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(data?: Partial<GraphqlTypes.SignUpInput>) {
    const { email, password, firstName, lastName } = data;
    this.email = email || undefined;
    this.password = password || undefined;
    this.firstName = firstName || undefined;
    this.lastName = lastName || undefined;
  }
}
