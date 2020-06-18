require('mysql2/node_modules/iconv-lite').encodingExists('foo');
const { ApolloServer } = require('apollo-server-express');
const { createTestClient } = require('apollo-server-testing');
const gql = require('graphql-tag');

const typeDefs = require('./mock/mockSchema.js');
const resolvers = require('../../resolvers/resolver.js');
const reqContext = require('./mock/mockContextReq.js');
const { users, notepads } = require('./mock/mockData.js');

describe('graphql query & mutation tests', () => {
    const db = require('./mock/mockModel.js');
    beforeAll(() => db.sequelize.sync({ force: true }));
    beforeAll(() => db.user.bulkCreate(users));

    const context = () => ({
        req: reqContext,
        db,
    });

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        context,
    });

    const { query, mutate } = createTestClient(server);
    const mockNotepads = notepads;

    describe('signUp 쿼리는', () => {
        it('성공시 true를 반환한다', async () => {
            const SIGN_UP = gql`
                mutation(
                    $id: ID!
                    $nickname: String!
                    $password: String!
                ) {
                    signUp(
                        id: $id
                        nickname: $nickname
                        password: $password
                    )
                }
            `;

            const { data: { signUp } } = await mutate(
                {
                    mutation: SIGN_UP,
                    variables: {
                        id: "testuser2",
                        nickname: "Eminem",
                        password: "123",
                    }
                }
            );
            expect(signUp).toBeTruthy();
        })
    })

    describe('login 쿼리는', () => {
        it('성공시 true를 반환한다', async () => {
            const LOGIN = gql`
                query {
                    login (
                        id: "testUser"
                        password: "123"
                    )
                }
            `;

            const { data: { login }} = await query({ query: LOGIN });
            expect(login).toBeTruthy();
        })
        it('실패시 false를 반환한다', async () => {
            const LOGIN = gql`
                query {
                    login (
                        id: "testUser"
                        password: "1234"
                    )
                }
            `;

            const { data: { login }} = await query({ query: LOGIN });
            expect(login).toBeFalsy();
        })
    });

    describe('createNote 뮤테이션은', () => {
        it('testUser의 노트 목록에 새로운 노트를 생성한다', async () => {
            const CREATE_NOTE = gql`
                mutation(
                    $title: String
                    $text: String!
                ) {
                    createNote(
                        title: $title
                        text: $text
                    ) {
                        title
                        text
                    }
                }
            `;

            const expected = {
                title: "Good",
                text: "Thank you",
            }

            const { data: { createNote } } = await mutate(
                {
                    mutation: CREATE_NOTE,
                    variables: {
                        title: "Good",
                        text: "Thank you",
                    },
                }
            );
            expect(createNote).toEqual(expected);
        })
    })

    describe('notepads 쿼리는', () => {
        it('해당 유저의 notepads 목록을 반환한다', async () => {
            const NOTEPADS = gql`
                query {
                    notepads {
                        id
                        userId
                        title
                        text
                    }
                }
            `;
            const { data: { notepads } } = await query({ query: NOTEPADS });
            expect(notepads).toEqual(mockNotepads);
        })
    });

    describe('updateNote 뮤테이션은', () => {
        it('testUser의 1번 노트의 제목을 바꾼다', async () => {
            const UPDATE_NOTE = gql`
                mutation(
                    $id: ID!
                    $title: String!
                    $text: String!
                ) {
                    updateNote(
                        id: $id
                        title: $title
                        text: $text
                    )
                }
            `;

            const { data: { updateNote } } = await mutate(
                {
                    mutation: UPDATE_NOTE,
                    variables: {
                        id: "1",
                        title: "Bye Bye",
                        text: "Vue3",
                    },
                }
            );
            expect(updateNote).toBeTruthy();
        })
    })

    describe('deleteNote 뮤테이션은', () => {
        it('testUser의 1번 노트를 삭제한다', async () => {
            const DELETE_NOTE = gql`
                mutation(
                    $id: ID!
                ) {
                    deleteNote(
                        id: $id
                    )
                }
            `;

            const { data: { deleteNote } } = await mutate(
                {
                    mutation: DELETE_NOTE,
                    variables: {
                        id: "1",
                    },
                }
            );
            expect(deleteNote).toBeTruthy();
        })
    })
})
