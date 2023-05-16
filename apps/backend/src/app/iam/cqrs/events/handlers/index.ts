import { LoginHandler } from './login.handler';
import { LogoutHandler } from './logout.handler';
import { RefreshTokenCreatedHandler } from './resfresh-token-created.handler';
import { UserCreatedHandler } from './user-created.handler';

export const EVENT_HANDLERS = [
  RefreshTokenCreatedHandler,
  LoginHandler,
  LogoutHandler,
  UserCreatedHandler,
];
