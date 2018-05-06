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
	let q = posts.putlike(posts.getPhotoPost(req.query.id), req.query.user);
	res.send(String(q));
	res.status(200).end();
});

server.get('/findIndex/:id', (req, res) => {
    let foundIndex = posts.getPhotoPosts(0, posts.getLength()).findIndex(function(element) {
        return element.id === req.params.id;
    });
    if (foundIndex !== -1) {
        res.send(String(foundIndex));
        res.status(200).end();
    }
    else {
    	res.status(404).end();
    }
});

server.get('/findPost/:index', (req, res) => {
    let post = posts.getPhotoPosts(0, posts.getLength())[req.params.index];
    if (post !== undefined) {
        res.send(post);
        res.status(200).end();
    }
    else {
    	res.status(404).end();
    }
});

server.post('/addPost', (req, res) => {
	let post = {
		id: req.body.id,
        description: req.body.description,
        createdAt: req.body.createdAt,
        author: req.body.author,
        photoLink: req.body.photoLink,
        hashTags: req.body.hashTags,
        likes: []
    };
	if (posts.addPost(post))
	{
		res.status(200).end();
	}
	else {
		res.status(404).end();
	}
});

server.post('/uploadImage', upload.single('file'), (req, res) => {
    fs.writeFile("public/images/" + req.file.originalname, req.file.buffer);
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