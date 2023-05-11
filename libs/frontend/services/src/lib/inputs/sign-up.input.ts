import { GraphqlTypes } from '@common/graphql';

export class SignUpInput implements GraphqlTypes.SignUpInput {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
