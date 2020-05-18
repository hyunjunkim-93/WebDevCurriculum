const express = require('express')
const app = express()

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
	res.setHeader('Access-Control-Allow-Credentials', true)
	next()
})
app.use('/', (req, res, next) => {
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
  res.end(JSON.stringify('Hello Everybody'))
})

app.post('/post', (req, res) => {
  const value = JSON.parse(req.body) + ' too'
  res.end(JSON.stringify(value))
})

app.listen(8081, () => {
  console.log(`LISTENING ON: http://localhost:8081`)
})
