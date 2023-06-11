import { GraphqlTypes } from '@common/graphql';

export class CreateProjectInput implements GraphqlTypes.CreateProjectInput {
  name: string;
  description: string;
  constructor(data?: Partial<GraphqlTypes.CreateProjectInput>) {
    const { name, description } = data;
    this.name = name;
    this.description = description;
  }
}
