describe('비로그인 유저 라우트 이동', () => {
    it('비로그인 유저는 로그인 페이지로 이동한다', async () => {
        await page.goto(URL);
        await Promise.all([
            page.on('dialog', async dialog => {
                await dialog.accept();
            }),
            page.waitForNavigation()
        ]);
        await page.screenshot({ path: './src/test/screenshot/loginView.png' });
        const result = page.url();
        const expected = 'http://localhost:8080/signin';
        expect(result).toBe(expected);
    })
})

describe('로그인', () => {
    it('로그인에 성공하면 기본 페이지로 이동한다', async () => {
        const id = 'testuser';
        const pw = '123';

        await page.type('#signin-input--id', id);
        await page.type('#signin-input--password', pw);
        await page.screenshot({ path: './src/test/screenshot/loginFillView.png' });
        await Promise.all([page.click('#signin-btn--login'), page.waitForNavigation()]);
        const result = page.url();
        const expected = 'http://localhost:8080/';
        expect(result).toBe(expected);
    })
})

describe('새로운 노트 추가', () => {
    it('새로운 노트의 값을 채우고 클릭하면 추가된다', async () => {
        const title = '제목입니다';
        const text = '노트 추가 테스트';

        await page.goto(URL);
        await page.click('#newNote-input--text');
        await page.type('#newNote-input--title', title);
        await page.type('#newNote-input--text', text);
        await page.screenshot({ path: './src/test/screenshot/newNotepad.png' });
        await page.click('#newNote-btn--add');
        await page.screenshot({ path: './src/test/screenshot/addedNote.png' });
        
        const titleDom = await page.$('.m-note-form--title');
        const addedNoteTitle = await page.evaluate(body => body.value, titleDom);
        
        expect(addedNoteTitle).toBe(title);
    })
})

describe('노트 내용 업데이트', () => {
    it('노트의 내용을 업데이트 한다', async () => {
        const titleDom = await page.$('.m-note-form--title');
        const msg = 'a';
        await titleDom.type(msg);
        await page.screenshot({ path: './src/test/screenshot/clickAddedNote.png' });
        const addedNoteTitle = await page.evaluate(body => body.value, titleDom);

        const expected = '제목입니다a';
        expect(addedNoteTitle).toBe(expected);
    })
})

describe('노트 삭제', () => {
    it('추가한 노트를 삭제한다', async () => {
        const target = await page.$('.m-note-form--delete');
        await target.click();
        await page.screenshot({ path: './src/test/screenshot/deletedNote.png' });
        const titleDom = await page.$('.m-note-form--title');
        expect(titleDom).toBe(null);
    })
})

describe('로그아웃', () => {
    it('로그인 페이지로 돌아간다', async () => {
        const target = await page.$('.v-notepad-logout');
        await Promise.all([target.click(), page.waitForNavigation()]);
        await page.screenshot({ path: './src/test/screenshot/logout.png' });
        const url = await page.url();

        const expected = 'http://localhost:8080/signin';
        expect(url).toBe(expected);
    })
})
