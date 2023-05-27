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
    Object.assign(this, data);
  }
}
