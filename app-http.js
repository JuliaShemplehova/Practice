const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

let server = http.createServer((req, res) => { 
    let filePath = 'public/'; 
    if (req.url == '/') {
      filePath += 'index.html';
    }
    else {
      filePath += req.url;
    }
   let extname = path.extname(filePath); 

  fs.readFile(filePath, function(error, content) { 
	    if (error) { 
        res.writeHead(404);
  			res.end('ERROR: ' + error.code); 
  			res.end(); 
	    } 
	    else { 
		    res.end(content, 'utf-8'); 
	    } 
    }); 

}); 

server.listen(3000, () => { 
	console.log('Server is running...');
});