import { GraphqlTypes } from '@common/graphql';

export class RefreshTokenInput implements GraphqlTypes.RefreshTokenInput {
  refreshToken: string;

  constructor(data?: Partial<GraphqlTypes.RefreshTokenInput>) {
    const { refreshToken } = data;
    this.refreshToken = refreshToken;
  }
}
