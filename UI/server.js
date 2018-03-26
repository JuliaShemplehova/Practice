const http = require('http'); 
const fs = require('fs'); 
const path = require('path'); 

let server = http.createServer((req, res) => { 
	console.log(req.url)
    let filePath = '';
    if (req.url === '/?') {
        filePath = './index.html';
    } 
    else {
        filePath = '.' + req.url;
    }

    res.write(fs.readFileSync(filePath, 'utf8'));
    res.end();
}); 

server.listen(3000, () => { 
	console.log('Server is running...');
});