import http from 'http';
import fs from 'fs';

const server = http.createServer((req, res) => {
  console.log('Request received')
  console.log(req.method, req.url)

  // send an HTML response
  res.setHeader('Content-Type', 'text/html')
  fs.readFile('./index.html', (err, data) => {
    if (err) {
      res.statusCode = 500
      console.warn(err)
      res.end('Internal server error')
      return
    } else {
      res.statusCode = 200
      res.write(data)
      res.end()
    }
  })
})

server.listen(3000, () => {
  console.log('Server started on http://localhost:3000')
})