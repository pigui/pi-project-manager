import { IQuery } from '@nestjs/cqrs';

export class FindProjectByIdQuery implements IQuery {
  constructor(public readonly _id: string) {}
}
