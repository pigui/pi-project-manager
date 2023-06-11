import { IEvent } from '@nestjs/cqrs';
import { Project } from '../../../schemas';

export class ProjectCreatedEvent implements IEvent {
  constructor(public readonly project: Project) {}
}
