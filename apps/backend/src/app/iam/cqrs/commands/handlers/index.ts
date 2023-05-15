import { RefreshTokensHandler } from './resfresh-tokens.handler';
import { SignInHandler } from './sign-in.handler';
import { SignUpHandler } from './sign-up.handler';

export const COMMAND_HANDLERS = [
  SignUpHandler,
  SignInHandler,
  RefreshTokensHandler,
];
