import { IQuery } from '@nestjs/cqrs';

export class FindUsersByIdsQuery implements IQuery {
  constructor(public _ids: string[]) {}
}
