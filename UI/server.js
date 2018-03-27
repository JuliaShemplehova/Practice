const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

let server = http.createServer((req, res) => { 
    let filePath = '.' + req.url; 
    if (filePath == './') 
        filePath = './index.html'; 
   let extname = path.extname(filePath); 
   let contentType = 'text/html'; 
   switch (extname) { 
   	    case '.json': 
   	        contentType = 'application/json'; 
   	        break; 
   	    case '.js': 
   	        contentType = 'text/javascript';
   	        break; 
   	    case '.css': 
   	        contentType = 'text/css'; 
   	        break;
   	    case '.png': 
   	        contentType = 'image/png'; 
   	        break; 
   	    case '.jpg': 
   	        contentType = 'image/jpg'; 
   	        break; 
   	    case '.jpeg': 
   	        contentType = 'image/jpeg'; 
   	        break; 
    }

    fs.readFile(filePath, function(error, content) { 
	    if (error) { 
	    	res.writeHead(500); 
			res.end('ERROR: ' + error.code + ' ..\n'); 
			res.end(); 
	    } 
	    else { 
		    res.writeHead(200, {'Content-Type': contentType}); 
		    res.end(content, 'utf-8'); 
	    } 
    }); 

}); 

server.listen(3000, () => { 
	console.log('Server is running...');
});