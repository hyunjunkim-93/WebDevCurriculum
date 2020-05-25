const express = require('express')
const parseurl = require('parseurl')
const session = require('express-session')

const app = express()

app.use(session({
  secret: 'ajksdfljskldfjkls',
  // 필수적으로 넣어줘야 하는 값
  // 노출되면 안됨
  resave: false,
  // 값이 바뀌지 않으면 저장소에 저장하지 않는다
  // 값이 바뀌든 바뀌지 않든 때 마다 저장소에 저장한다
  saveUninitialized: true
  // 세션이 필요하지 않으면 구동시키지 않는다
}))

app.get('/', (req, res, next) => {
  console.log(req.headers)
  if (req.session.num === undefined) {
    req.session.num = 1
  } else {
    req.session.num += 1
  }
  res.send(`Views: ${req.session.num}`)
})

app.listen(3000, () => {
  console.log('http://localhost:3000')
})
