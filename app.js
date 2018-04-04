const express = require('express');
const parser = require('body-parser');
const fs = require('fs');

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

server.post('/addPost', (req, res) => {
	if (posts.addPhotoPost({
		id: req.body.id,
        description: req.body.description,
        createdAt: new Date(req.body.createdAt),
        author: req.body.author,
        photoLink: req.body.photoLink,
        hashTags: req.body.hashTags,
        likes: []
    }))
	{
		res.status(200).end();
	}
	else {
		res.status(404).end();
	}
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