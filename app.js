const express = require('express');
const path = require('path');
const staticCont = require('node-static');
const modul = require('./public/index.js');

const file = new staticCont.Server('.', {
  cache: 0,
});
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json({ limit: '50mb' }));
const router = express.Router();
router.route('/:params*')
  .get((req, res) => res.sendFile(path.resolve(`public/${req.path}`)));
app.use('/public', router);

app.get('/', (req, res) => res.sendFile(path.resolve('public/index.html')));
const server = app.listen(8080, () => {
  console.log(`Server listening on port ${server.address().port}`);
});

app.delete('/deletePost', (req, res) => {
  let posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts);
  posts = modul.removePhotoPost(posts, req.query.id);
  fs.writeFile('./server/data/data.json', JSON.stringify(posts));
  res.send('written to file');
});

app.post('/addPost', (req, res) => {
  let posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts);
  posts = modul.addPhotoPost(posts, req.body);
  fs.writeFile('./server/data/data.json', JSON.stringify(posts));
  res.send('written to file');
});
app.put('/editPost', (req, res) => {
  let posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts);
  posts = modul.editPhotoPost(req.query.id, req.body, posts);
  if (posts) {
    fs.writeFile('./server/data/data.json', JSON.stringify(posts));
    res.send('written to file');
  }
  res.send('error editing');
});
app.put('/editLike', (req, res) => {
  let posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts);
  posts = modul.addLike(req.query.id, req.query.name, posts);
  if (posts) {
    fs.writeFile('./server/data/data.json', JSON.stringify(posts));
    res.send('written to file');
  } else {
    res.send('error editing');
  }
});
app.post('/getPosts', (req, res) => {
  let posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts);
  posts = modul.getPhotoPosts((Number)(req.query.skip), (Number)(req.query.top), req.body, posts);
  res.send(JSON.stringify(posts));
});
app.get('/getPost', (req, res) => {
  let posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts);
  let post = modul.getPhotoPost(req.query.id, posts);
  res.status(200).send(post);
});
