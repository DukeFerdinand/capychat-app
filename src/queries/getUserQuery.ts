import { gql } from "@apollo/client";

export const getUserQuery = gql`
    query GetUser($email: String!) {
        findUserByEmail(email: $email) {
            id
            username
            email
            displayName
        }
    }
`;
