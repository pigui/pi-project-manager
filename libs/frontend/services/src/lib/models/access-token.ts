import { GraphqlTypes } from '@common/graphql';
import { User } from './user';

export class AccessToken implements GraphqlTypes.AccessToken {
  accessToken: string;
  refreshToken: string;
  user: User;
  constructor(
    data?: Partial<Omit<GraphqlTypes.AccessToken, 'user'> & { user: User }>
  ) {
    Object.assign(this, data);
  }
}
