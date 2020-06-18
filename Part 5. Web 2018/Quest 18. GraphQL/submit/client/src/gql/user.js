import gql from 'graphql-tag';

export const LOGIN = gql`
    query Login(
        $id: ID!,
        $password: String!,
    ) {
        login(
            id: $id,
            password: $password,
        )
    }
`

export const LOGOUT = gql`
    query Logout {
        logout
    }
`

export const LOGIN_INFO = gql`
    query LoginInfo {
        login
    }
`

export const AUTH = gql`
    query Auth {
        auth
    }
`

export const SIGN_UP = gql`
    mutation SignUp(
        $id: ID!,
        $nickname: String!,
        $password: String!,
    ) {
        signUp(
            id: $id,
            nickname: $nickname,
            password: $password,
        )
    }
`
