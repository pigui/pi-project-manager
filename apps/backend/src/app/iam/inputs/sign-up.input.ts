import { GraphqlTypes } from '@common/graphql';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpInput implements GraphqlTypes.SignUpInput {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;
}
