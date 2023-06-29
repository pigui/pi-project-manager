import { GraphqlTypes } from '@common/graphql';

export class RefreshTokenInput implements GraphqlTypes.RefreshTokenInput {
  refreshToken: string;

  constructor(data?: Partial<GraphqlTypes.RefreshTokenInput>) {
    this.refreshToken = data && data.refreshToken ? data.refreshToken : null;
  }
}
