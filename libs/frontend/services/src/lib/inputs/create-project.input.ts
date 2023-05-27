import { GraphqlTypes } from '@common/graphql';

export class CreateProjectInput implements GraphqlTypes.CreateProjectInput {
  name: string;
  description: string;
  constructor(data?: Partial<GraphqlTypes.CreateProjectInput>) {
    Object.assign(this, data);
  }
}
