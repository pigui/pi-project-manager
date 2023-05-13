import { GraphqlTypes } from '@common/graphql';

export class User implements GraphqlTypes.User {
  _id: string;
  email: string;
  password?: (string | null) | undefined;
  googleId?: (string | null) | undefined;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<GraphqlTypes.User>) {
    Object.assign(this, data);
  }
}
