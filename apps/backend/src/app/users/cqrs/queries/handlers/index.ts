import { FindUserByIdHandler } from './find-user-by-id.handler';
import { FindUserByEmailHandler } from './find-user-email.handler';
import { FindUsersHandler } from './find-users.handler';

export const QUERY_HANDLERS = [
  FindUsersHandler,
  FindUserByIdHandler,
  FindUserByEmailHandler,
];
