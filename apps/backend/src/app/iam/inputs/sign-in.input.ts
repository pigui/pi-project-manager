import { GraphqlTypes } from '@common/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInInput implements GraphqlTypes.SignInInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
