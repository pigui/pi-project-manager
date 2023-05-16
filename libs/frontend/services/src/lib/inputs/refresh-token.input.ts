import { GraphqlTypes } from '@common/graphql';

export class RefreshTokenInput implements GraphqlTypes.RefreshTokenInput {
  refreshToken: string;
}
