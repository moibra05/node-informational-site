const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer((req, res) => {
  const pathname = url.parse(req.url, true).pathname;

  function displayPage(err, data) {
    if(err){
      res.writeHead(404, {'Content-Type':'text/html'});
      res.write(data);
      return res.end();
    }

    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(data);
    return res.end();
  } 

  if(pathname == '/')
    fs.readFile('./index.html', (err, data) => displayPage(err, data));
  else if(['/about', '/contact-me'].includes(pathname)) 
    fs.readFile(`.${pathname}.html`, (err, data) => displayPage(err, data));
  else
    fs.readFile('./404.html', (err, data) => displayPage(true, data));
}).listen(8080);