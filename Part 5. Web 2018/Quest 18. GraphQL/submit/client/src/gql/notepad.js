import gql from 'graphql-tag';

export const ALL_NOTEPADS = gql`
    query AllNotepads {
        notepads {
            id
            userId
            title
            text
            createdAt
            updatedAt
        }
    }
`

export const NEW_NOTEPAD = gql`
    mutation NewNotepad(
        $title: String!,
        $text: String!,
    ) {
        createNote(
            title: $title,
            text: $text,
        ) {
            id
            userId
            title
            text
            createdAt
            updatedAt
        }
    }
`

export const UPDATE_NOTEPAD = gql`
    mutation UpdateNotepad(
        $id: ID!,
        $title: String!,
        $text: String!,
    ) {
        updateNote(
            id: $id
            title: $title,
            text: $text,
        )
    }
`

export const DELETE_NOTEPAD = gql`
    mutation DeleteNotepad(
        $id: ID!,
    ) {
        deleteNote(
            id: $id,
        )
    }
`
