const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    FileStore = require('session-file-store')(session),
    fs = require('fs'),
	app = express();

app.use(express.static('client'));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
})
/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: '@@-happy-hacking-@@',
    resave: false,
    saveUninitialized: true,
    store: new FileStore(),
    cookie: { expires: 60000 },
}));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/notepad', (req, res) => {
    try {
        if (!req.session.user) return;
        const userDirPath = `./notepad/${req.session.user.id}`
        const files = fs.readdirSync(userDirPath);
        if (files.length == 0) {
            res.end(JSON.stringify({ ok: 0, msg: 'The file was not found!' }));
        } else {
            const result = files.reduce((acc, curr) => {
                const data = fs.readFileSync(`${userDirPath}/${curr}`).toString();
                acc.push(JSON.parse(data));
                return acc;
            }, []);
            res.end(JSON.stringify({ ok: 1, item: result }));
        }
    } catch (err) {
        if (err.code === 'ENOENT') {
            res.end(JSON.stringify({ ok: 0, msg: 'The folder was not found!' }));
            console.error('The Folder were not found!');
        } else {
            throw err;
        }
    }
})

app.post('/api/notepad', (req, res) => {
    const { id, created, title, description, modified } = req.body;

    try {
        fs.accessSync(`./notepad/${req.session.user.id}/${id}.txt`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        console.error('Already existed');
    } catch (err) {
        if (err.code === 'ENOENT') {
            fs.opendirSync(`./notepad/${req.session.user.id}`);
            fs.writeFile(`./notepad/${req.session.user.id}/${id}.txt`, JSON.stringify({ id, created, title, description, modified }), err => {
                if (err) throw err;
            })
            res.end(JSON.stringify({ ok: 1, msg: 'success' }));
        } else {
            console.error(err);
        }
    }
})

app.put('/api/notepad', (req, res) => {
    const { id, title, description, created, modified } = req.body;
    const data = JSON.stringify({ id, title, description, created, modified });

    try {
        fs.accessSync(`./notepad/${req.session.user.id}/${id}.txt`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        const readStream = fs.createReadStream(`./notepad/${req.session.user.id}/${id}.txt`);
        const writeStream = fs.createWriteStream(`./notepad/${req.session.user.id}/${id}.txt`);
        readStream.pipe(writeStream);
        writeStream.on('finish', () => {
            console.log('노트 업데이트 완료');
        });
        writeStream.write(data);
        writeStream.end();
        res.end(JSON.stringify({ ok: 1, msg: 'success' }));
    } catch (err) {
        if (err.code === 'ENOENT') {
            console.error('No File!');
        } else {
            console.error(err);
        }
    }
})

app.delete('/api/notepad', (req, res) => {
    try {
        const { id } = req.body;
        fs.accessSync(`./notepad/${req.session.user.id}/${id}.txt`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK);
        fs.unlink(`./notepad/${req.session.user.id}/${id}.txt`, err => {
            if (err) {
                console.error(err);
            }
            res.end(JSON.stringify({ ok: 1, msg: 'success' }));
        })
    } catch (err) {
        console.error(err);
    }
})

app.get('/api/login', (req, res) => {
    try {
        if (req.session.user) {
            res.end(JSON.stringify({ ok: 1, msg: 'success', user: req.session.user }));
        } else {
            res.end(JSON.stringify({ ok: 0, msg: '로그인 해주세요' }));
        }
    } catch (err) {
        console.error(err);
    }
})

app.post('/api/login', (req, res) => {
    try {
        const usersJSON = fs.readFileSync('./user.json').toString();
        const users = JSON.parse(usersJSON);
        let result;
        let currentUser;
        for (const user in users) {
            if (users[user].id == req.body.id && users[user].pw == req.body.pw) {
                result = true;
                currentUser = users[user];
            }
        }
        const sess = req.session;

        if (!sess[currentUser.id]) {
            sess[currentUser.id] = {
                cursor: '',
                tab: '',
            };
        }

        if (result) {
            sess.user = {
                login: true,
                id: currentUser.id,
                nickname: currentUser.nickname,
            };
            res.end(JSON.stringify({ ok: 1, msg: 'success', user: sess.user }));
        } else {
            res.end(JSON.stringify({ ok: 0, msg: '아이디와 비밀 번호를 다시 확인해주세요' }));
        }
    } catch(err) {
        console.error(err);
    }
})

app.get('/api/tab', (req, res) => {
    try {
        if (!req.session.user) return;
        const userId = req.session[req.session.user.id];
        const item = {
            cursor: userId.cursor,
            tab: userId.tab,
        };
        res.end(JSON.stringify({ ok: 1, msg: '탭 정보 불러오기 성공', item }));
    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: '탭 정보 불러오기 실패' }));
    }
})

app.post('/api/tab', (req, res) => {
    try {
        if (!req.session.user) return;
        const { cursor, tab } = req.body;
        const userId = req.session[req.session.user.id];
        userId.cursor = cursor;
        userId.tab = tab;
        res.end(JSON.stringify({ ok: 1, msg: '탭 정보 자정 완료' }));
    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: '탭 정보 저장 실패' }));
    }
})

app.get('/api/logout', (req, res) => {
    try {
        delete req.session.user;
        res.end(JSON.stringify({ ok: 1, msg: '정상적으로 로그아웃 됐습니다' }));
    } catch (err) {
        console.error(err);
        res.end(JSON.stringify({ ok: 0, msg: '로그아웃에 실패했습니다' }));
    }
})

const server = app.listen(8080, () => {
	console.log('Server started! http://localhost:8080');
});
