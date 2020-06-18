const gql = require('graphql-tag');

module.exports = gql`
    type Query {
        users:[User!]!
        notepads: [Notepad!]!
        login(id: ID!, password: String!): Boolean!
        logout: Boolean!
        auth: Boolean!
    }

    type Mutation {
        createNote(title: String, text: String!): Notepad!
        updateNote(id: ID!, title: String, text: String): Boolean!
        deleteNote(id: ID!): Boolean!
        signUp(id: ID!, nickname: String!, password: String!): Boolean!
    }

    type User {
        id: ID!
        password: String!
        nickname: String!
        salt: String!
        createdAt: String!
        updatedAt: String!
    }

    type Notepad {
        id: ID!
        userId: String!
        title: String!
        text: String!
        createdAt: String!
        updatedAt: String!
    }

    type Authorization {
        isAuthorized: Boolean!
    }
`
