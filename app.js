const express = require('express');
const parser = require('body-parser');
const fs = require('fs');
const multer = require('multer');

const upload = multer();
const server = express();
server.use(parser.json());
server.use(express.static('public'));

const posts = require('./server/data/functions.js');

server.get('/allPosts', (req, res) => {
  const photoposts = posts.getPhotoPosts(0, posts.getLength());
  if (photoposts.length) {
    res.send(photoposts);
  } else {
    res.status(404).end();
  }
});

server.post('/getPosts', (req, res) => {
  const photoposts = posts.getPhotoPosts(req.body.skip, req.body.top, req.body.filterConfig);
  if (photoposts.length) {
    res.send(photoposts);
  } else {
    res.status(404).end();
  }
});

server.get('/getPost/:id', (req, res) => {
  const post = posts.getPhotoPost(req.params.id);
  if (post) {
    res.send(post);
  } else {
    res.status(404).end();
  }
});

server.get('/getSize', (req, res) => {
  const size = String(posts.getLength());
  res.send(size);
  res.status(200).end();
});

server.get('/putLike', (req, res) => {
  const q = posts.putlike(posts.getPhotoPost(req.query.id), req.query.user);
  res.send(String(q));
  res.status(200).end();
});

server.get('/findIndex/:id', (req, res) => {
  const ind = posts.getPhotoPosts(0, posts.getLength()).findIndex(el => el.id === req.params.id);
  if (ind !== -1) {
    res.send(String(ind));
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

server.get('/findPost/:index', (req, res) => {
  const post = posts.getPhotoPosts(0, posts.getLength())[req.params.index];
  if (post !== undefined) {
    res.send(post);
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

server.post('/addPost', (req, res) => {
  const post = {
    id: req.body.id,
    description: req.body.description,
    createdAt: req.body.createdAt,
    author: req.body.author,
    photoLink: req.body.photoLink,
    hashTags: req.body.hashTags,
    likes: []
  };
  if (posts.addPost(post)) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

server.post('/uploadImage', upload.single('file'), (req, res) => {
  fs.writeFile('public/images/' + req.file.originalname, req.file.buffer);
  res.status(200).end();
});

server.delete('/deletePost/:id', (req, res) => {
  if (posts.removePhotoPost(req.params.id)) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

server.put('/editPost/:id', (req, res) => {
  if (posts.editPhotoPost(req.params.id, {
    description: req.body.description,
    photoLink: req.body.photoLink,
    hashTags: req.body.hashTags
  })) {
    res.status(200).end();
  } else {
    res.status(404).end();
  }
});

server.listen(3000, () => {
  console.log('Server is running:)');
});
