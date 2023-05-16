import { GraphqlTypes } from '@common/graphql';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LogoutInput implements GraphqlTypes.LogoutInput {
  @IsNotEmpty()
  @IsMongoId()
  userId: string;
}
