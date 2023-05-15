import { COMMAND_HANDLERS } from './commands/handlers';
import { EVENT_HANDLERS } from './events/handlers';

export const HANDLERS = [...COMMAND_HANDLERS, ...EVENT_HANDLERS];
