import { GraphqlTypes } from '@common/graphql';
import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByIdInput implements GraphqlTypes.FindUserByIdInput {
  @IsNotEmpty()
  @IsString()
  @IsMongoId()
  _id: string;
}
