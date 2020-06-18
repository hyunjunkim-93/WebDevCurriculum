const { GraphQLServer } = require('graphql-yoga');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const { readFileSync } = require('fs');

const typeDefs = readFileSync('./src/schema/schema.graphql', 'UTF-8');
const resolvers = require('./src/resolvers/resolver.js');

const db = require('./src/models/');
db.sequelize.sync();

const context = req => ({
    req: req.request,
    db,
});

const server = new GraphQLServer({
    typeDefs,
    resolvers,
    context,
});

const opts = {
    port: 8081,
    cors: {
        credentials: true,
        origin: ['http://localhost:8080'],
    },
};

server.express.use(session({
    secret: '@@-happy-hacking-@@',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: { expires: 180000 },
}));

server.start(opts, () => {
    console.log(`Server is running on http://localhost:${opts.port}`);
});
