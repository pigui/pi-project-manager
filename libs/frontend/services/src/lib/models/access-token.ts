import { GraphqlTypes } from '@common/graphql';
import { User } from './user';

export class AccessToken implements GraphqlTypes.AccessToken {
  accessToken: string;
  refreshToken: string;
  user: User;
  constructor(
    data?: Partial<Omit<GraphqlTypes.AccessToken, 'user'> & { user: User }>
  ) {
    const { accessToken, refreshToken, user } = data;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.user = user;
  }
}
