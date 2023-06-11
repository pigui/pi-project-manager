import { FindProjectByIdHandler } from './find-project-by-id.handler';
import { FindProjectsByOwnerHandler } from './find-projects-by-owner.handler';
import { FindProjectsHandler } from './find-projects.handler';

export const QUERY_HANDLERS = [
  FindProjectsHandler,
  FindProjectByIdHandler,
  FindProjectsByOwnerHandler,
];
