const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const app = express();

const corsOptions = {
    origin: 'http://localhost:8081',
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

app.use(express.static(__dirname + '/client'));

app.use((req, res, next) => {
    if (!req.session.userId) {
        req.session.userId = 'temp';
    };
    if (req.session.userId === 'temp' && req.method === 'GET') {
        res.json({ ok: 0, msg: '로그인을 부탁드립니다' });
    };
    next();
})

require('./backend/routes/user.routes.js')(app);
require('./backend/routes/notepad.routes.js')(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

const db = require('./backend/models');
db.sequelize.sync();
