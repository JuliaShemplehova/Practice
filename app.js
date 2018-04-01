const express = require('express');
const parser = require('body-parser');
let server = express();

server.use(parser.json());
server.use(express.static('public'));

server.listen(3000, () => { 
	console.log('Server is running:)');
});