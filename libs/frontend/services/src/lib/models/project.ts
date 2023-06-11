import { GraphqlTypes } from '@common/graphql';

export class Project implements GraphqlTypes.Project {
  _id: string;
  name: string;
  description: string;
  owner: GraphqlTypes.User;
  users?: GraphqlTypes.User[];
  status: GraphqlTypes.ProjectStatus;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: Partial<GraphqlTypes.Project>) {
    const {
      _id,
      name,
      description,
      owner,
      users,
      status,
      createdAt,
      updatedAt,
    } = data;
    this._id = _id;
    this.name = name;
    this.description = description;
    this.owner = owner;
    this.users = users;
    this.status = status;
    this.createdAt = createdAt ? new Date(createdAt) : undefined;
    this.updatedAt = updatedAt ? new Date(updatedAt) : undefined;
  }
}
