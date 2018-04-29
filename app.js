const express = require('express');
const parser = require('body-parser');
const fs = require('fs');

const multer = require("multer");
const upload = multer();

let server = express();
server.use(parser.json());
server.use(express.static('public'));

let posts = require('./server/data/functions.js');

server.get('/allPosts', (req, res) => {
	let photoposts = posts.getPhotoPosts(0, posts.getLength());
	photoposts.length ? res.send(photoposts) : res.status(404).end();
});

server.post('/getPosts', (req, res) => {
	let photoposts = posts.getPhotoPosts(req.body.skip, req.body.top, req.body.filterConfig);
	photoposts.length ? res.send(photoposts) : res.status(404).end();
});

server.get('/getPost/:id', (req, res) => {
	let post = posts.getPhotoPost(req.params.id);
	post ? res.send(post) : res.status(404).end();
});

server.get('/getSize',(req, res) => {
	let size = String(posts.getLength());
	res.send(size);
	res.status(200).end();
});

server.get('/putLike', (req, res) => {
    posts.putlike(posts.getPhotoPost(req.query.id), req.query.user);
	res.status(200).end();
});

server.post('/addPost', (req, res) => {
	if (posts.addPhotoPost({
		id: req.body.id,
        description: req.body.description,
        createdAt: req.body.createdAt,
        author: req.body.author,
        photoLink: req.body.photoLink,
        hashTags: req.body.hashTags,
        likes: []
    }))
	{
		res.status(200).end();
	}
	else {
		res.status(406).end();
	}
});

server.post('uploadImage', upload.single('file'), (req, res) => {
    fs.writeFile("public/images" + req.file.originalname, req.file.buffer);
    res.status(200).end();
});

server.delete('/deletePost/:id', (req, res) => {
	if (posts.removePhotoPost(req.params.id)) {
		res.status(200).end();
	}
	else {
		res.status(404).end();
	}
});

server.put('/editPost/:id', (req, res) => {
    if (posts.editPhotoPost(req.params.id, {
    	description: req.body.description,
        photoLink: req.body.photoLink,
        hashTags: req.body.hashTags
    }))
    {
        res.status(200).end();
    }
    else res.status(404).end();
});

server.listen(3000, () => { 
	console.log('Server is running:)');
});