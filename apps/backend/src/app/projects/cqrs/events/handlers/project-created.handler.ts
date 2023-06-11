import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProjectCreatedEvent } from '../impl';
import { PubSub } from 'graphql-subscriptions';

@EventsHandler(ProjectCreatedEvent)
export class ProjectCreatedHandler
  implements IEventHandler<ProjectCreatedEvent>
{
  constructor(public readonly pubSub: PubSub) {}
  handle({ project }: ProjectCreatedEvent): void {
    this.pubSub.publish('PROJECT_CREATED', { projectCreated: project });
  }
}
