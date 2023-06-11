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
    const {
      _id,
      email,
      password,
      googleId,
      firstName,
      lastName,
      createdAt,
      updatedAt,
    } = data;
    this._id = _id;
    this.email = email;
    this.password = password;
    this.googleId = googleId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
  }
}
