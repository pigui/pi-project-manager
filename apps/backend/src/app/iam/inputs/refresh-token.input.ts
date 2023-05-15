import { GraphqlTypes } from '@common/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenInput implements GraphqlTypes.RefreshTokenInput {
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}
