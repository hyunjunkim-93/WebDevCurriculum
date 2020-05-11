const http = require('http');
const url = require('url');
const qs = require('querystring');
const PORT =  8080;
const URL = `http://localhost:${PORT}`

http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  const parsedUrl = url.parse(req.url);
  if (parsedUrl.pathname === '/') {
    res.end('Hello World!');
  }

  if (parsedUrl.pathname === '/foo') {
    if (req.method === 'GET') {
      const query = qs.parse(parsedUrl.query);
      res.end(`Hello, ${query.bar || 'World!'}`);
    }
    if (req.method === 'POST') {
      let postData = '';
      req.on('data', data => {
        postData += data;
      })
      req.on('end', () => {
        const query = qs.parse(postData);
        res.end(`Hello, ${query.bar}`);
      })
    }
  }
}).listen(PORT, () => {
  console.log(URL);
});
