import { Injectable } from '@nestjs/common';
import { QueryBus } from '@nestjs/cqrs';
import { User } from './schemas';
import {
  FindUserByEmailQuery,
  FindUserByIdQuery,
  FindUsersByIdsQuery,
  FindUsersQuery,
} from './cqrs/queries/impl';

@Injectable()
export class UsersService {
  constructor(private readonly queryBus: QueryBus) {}

  findUsers(): Promise<User[]> {
    return this.queryBus.execute(new FindUsersQuery());
  }

  findUserById(_id: string): Promise<User> {
    return this.queryBus.execute(new FindUserByIdQuery(_id));
  }

  findUsersById(_ids: string[]): Promise<User[]> {
    return this.queryBus.execute(new FindUsersByIdsQuery(_ids));
  }

  findUserByEmail(email: string): Promise<User> {
    return this.queryBus.execute(new FindUserByEmailQuery(email));
  }
}
