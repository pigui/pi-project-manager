import { GraphqlTypes } from '@common/graphql';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectInput implements GraphqlTypes.CreateProjectInput {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  description: string;
}
