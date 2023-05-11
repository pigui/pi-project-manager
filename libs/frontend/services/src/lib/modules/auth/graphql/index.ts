import { gql } from 'apollo-angular';

export const SIGN_UP = gql`
  mutation SignUp($signUpInput: SignUpInput!) {
    signUp(signUpInput: $signUpInput) {
      _id
    }
  }
`;
