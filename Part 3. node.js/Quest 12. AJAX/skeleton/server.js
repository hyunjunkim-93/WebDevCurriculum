const express = require('express'),
	path = require('path'),
	fs = require('fs'),
	app = express();

app.use(express.static('client'));
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})
app.use('/api/notepad', (req, res, next) => {
	let data = ''
	req.on('data', chunk => {
		data += chunk
	})
	req.on('end', () => {
		req.body = data.toString()
		next()
	})
})

app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'))
})

/* TODO: 여기에 처리해야 할 요청의 주소별로 동작을 채워넣어 보세요..! */
// GET 요청을 받으면 폴더의 파일에 대한 데이터를 반환해준다
app.get('/api/notepad', (req, res) => {
	try {
    const files = fs.readdirSync('./notepad')
    if (files.length == 0) {
      res.end(JSON.stringify({ ok: 0, msg: 'The file was not found!'}))
    } else {
      const result = files.reduce((acc, curr) => {
        const data = fs.readFileSync(`./notepad/${curr}`).toString()
        const created = curr.split('.')[0]
        const { title, description, modified } = JSON.parse(data)
        const el = { created, title, description, modified }
        acc.push(el)
        return acc
      }, [])
      res.end(JSON.stringify({ ok: 1, item: result }))
    }
	} catch (err) {
		if (err.code === 'ENOENT') {
      res.end(JSON.stringify({ ok: 0, msg: 'The folder was not found!' }))
			console.error('The folder were not found!')
		} else {
			throw err
    }
	}
})

// POST 요청을 받았을 때 바디의 데이터를 기준으로 파일을 생성한다
app.post('/api/notepad', (req, res) => {
  const { created, title, description, modified } = JSON.parse(req.body)
  
  try {
    fs.accessSync(`./notepad/${created}.txt`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK)
    console.error('Already existed')
  } catch (err) {
    if (err.code === 'ENOENT') {
      fs.writeFile(`./notepad/${created}.txt`, JSON.stringify({ title, description, modified }), err => {
        if (err) throw err
      })
    } else {
      console.error(err)
    }
  }
})

// PUT 요청을 받았을 때 바디의 데이터를 기준으로 파일을 업데이트 한다
app.put(`/api/notepad`, (req, res) => {
  const { created, title, description, modified } = JSON.parse(req.body)
  const data = JSON.stringify({ title, description, modified })
  
  try {
    fs.accessSync(`./notepad/${created}.txt`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK)
    const readStream = fs.createReadStream(`./notepad/${created}.txt`)
    const writeStream = fs.createWriteStream(`./notepad/${created}.txt`)
    readStream.pipe(writeStream)
    writeStream.on('finish', () => {
      console.log('노트 업데이트 완료')
    })
    writeStream.write(data)
    writeStream.end()
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('No File!')
    } else {
      console.error(err)
    }
  }
})

// DELETE 요청을 받았을 때 바디의 데이터를 기준으로 해당 파일을 삭제한다
app.delete(`/api/notepad`, (req, res) => {
  const created = JSON.parse(req.body)

  try {
    fs.accessSync(`./notepad/${created}.txt`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK)
    fs.unlink(`./notepad/${created}.txt`, err => {
      if (err) {
        console.error(err)
      }
    })
  } catch (err) {
    if (err.code === 'ENOENT') {
      console.error('No File!')
    } else {
      console.error(err)
    }
  }
})

const server = app.listen(8080, () => {
	console.log('Server started!')
});
