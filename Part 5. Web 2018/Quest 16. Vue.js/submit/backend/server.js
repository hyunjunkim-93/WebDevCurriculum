const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const history = require('connect-history-api-fallback');

const app = express();

const corsOptions = {
    origin: 'http://localhost:8080',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '@@-happy-hacking-@@',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: { expires: 180000 },
}));

app.use(history({
    verbose: true,
}));

app.use(express.static(__dirname + '/dist'));

app.use((req, res, next) => {
    const case1 = !req.session.userId;
    const case2 = req.session.userId === 'temp' && req.method === 'GET';
    if (case1 || case2) {
        req.session.userId = 'temp';
        res.json({ ok: 0, msg: '로그인을 부탁드립니다', type: 'redirect', path: '/signin' });
    };
    next();
})

require('./routes/user.routes.js')(app);
require('./routes/notepad.routes.js')(app);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const db = require('./models');
db.sequelize.sync();
