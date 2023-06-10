import { gql } from 'apollo-angular';

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      _id
    }
  }
`;

export const MY_PROJECTS = gql`
  query MyProjects {
    findMyProjects {
      _id
    }
  }
`;
