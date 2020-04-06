import { gql } from 'apollo-boost';

// Recipes Queries
export const GET_ALL_RECIPES = gql`
query{
    getAllRecipes{
        name
        description
        instructions
        category
        likes
        createdDate
    }
}
`;

// Recipes Mutations


// user Queries


// user Mutations


export const SIGNUP_USER = gql`
mutation($username: String!, $email: String!, $password: String!){
    signupUser(username: $username, email: $email, password: $password){
        token
    }
}
`;