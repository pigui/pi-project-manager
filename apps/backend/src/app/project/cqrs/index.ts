import { COMMAND_HANDLERS } from './commands/handlers';
import { EVENT_HANDLERS } from './events/handlers';
import { QUERY_HANDLERS } from './queries/handlers';

export const HANDLERS = [
  ...COMMAND_HANDLERS,
  ...EVENT_HANDLERS,
  ...QUERY_HANDLERS,
];
