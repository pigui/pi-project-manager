import { gql } from 'apollo-angular';

export const CREATE_PROJECT = gql`
  mutation CreateProject($createProjectInput: CreateProjectInput!) {
    createProject(createProjectInput: $createProjectInput) {
      _id
      name
      description
      owner {
        _id
      }
      status
      createdAt
      updatedAt
    }
  }
`;

export const MY_PROJECTS = gql`
  query MyProjects {
    findMyProjects {
      _id
      name
      description
      owner {
        _id
      }
      status
      createdAt
      updatedAt
    }
  }
`;
