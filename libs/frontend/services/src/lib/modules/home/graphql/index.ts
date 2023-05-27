import { gql } from 'apollo-angular';

export const FIND_MY_PROJECTS = gql`
  query MyProjects {
    findProjects {
      _id
    }
  }
`;
