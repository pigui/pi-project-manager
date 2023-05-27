import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { User } from '../../users/schemas';
import { REQUEST_USER_KEY } from '../constants';
import { GqlExecutionContext } from '@nestjs/graphql';

export const ActiveUser = createParamDecorator((context: ExecutionContext) => {
  const request = GqlExecutionContext.create(context);
  const user: User = request.getContext()[REQUEST_USER_KEY];
  return user;
});
