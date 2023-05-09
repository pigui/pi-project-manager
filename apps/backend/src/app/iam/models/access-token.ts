import { GraphqlTypes } from '@common/graphql';
import { User } from '../../users/schemas';

export class AccessToken implements Omit<GraphqlTypes.AccessToken, 'user'> {
  accessToken: string;
  refreshToken: string;
  user: User;
}
