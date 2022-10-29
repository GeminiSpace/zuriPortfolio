const path = require('path');
const fs = require('fs');
const http = require('http');

// Creating a server with the HTTP variable
const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, 'portfolio', req.url === '/' ? 'index.html': req.url)
  let contentType = getContentType(filePath) || 'text/html'
  fs.readFile(filePath, 'utf8', (err ,content) => {
    if(!err) {
      res.writeHead(200, {'Content-Type': contentType})
      res.end(content)
    }
  })
  if(req.url === '/home') {
    let filePath = path.join(__dirname, 'portfolio', 'index.html')
    fs.readFile(filePath, 'utf8', (err, data) => {
       res.writeHead(200, {'Content-Type': 'text/html'})
       res.end(data)
    })
  }
});

  const getContentType = (filePath) => {
    let extname = path.extname(filePath)
    if(extname === '.js'){
      return 'text/javascript'
    }
    if(extname === '.css'){
      return 'text/css'
    }
  }
  
// Creating a port
server.listen(4000, () => {
	console.log('server is running on port 4000');
})