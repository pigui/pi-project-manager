import { GraphqlTypes } from '@common/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class FindUserByEmailInput implements GraphqlTypes.FindUserByEmailInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
}
