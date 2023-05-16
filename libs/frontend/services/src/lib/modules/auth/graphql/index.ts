import { gql } from 'apollo-angular';

export const SIGN_UP = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      _id
      email
      firstName
      lastName
      createdAt
      updatedAt
    }
  }
`;

export const SIGN_IN = gql`
  mutation SignIn($signInInput: SignInInput!) {
    signIn(signInInput: $signInInput) {
      accessToken
      refreshToken
      user {
        _id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;

export const REFRESH_TOKENS = gql`
  mutation RefreshTokens($refreshTokenInput: RefreshTokenInput!) {
    refreshTokens(refreshTokenInput: $refreshTokenInput) {
      accessToken
      refreshToken
      user {
        _id
        email
        firstName
        lastName
        createdAt
        updatedAt
      }
    }
  }
`;
