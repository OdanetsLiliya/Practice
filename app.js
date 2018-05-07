const express = require('express');
const path = require('path');
const staticCont = require('node-static');

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

app.post('/sendPost', (req, res) => {
  let posts;
  posts = fs.readFileSync('./server/data/data.json', 'utf8');
  posts = JSON.parse(posts, (key, value) => {
    if (key == 'createdAt') return new Date(value);
    return value;
  });
  posts.push(req.body);
  fs.writeFile('./server/data/data.json', JSON.stringify(posts));
  res.send('written to file');
});

app.post('/changeData', (req, res) => {
  fs.writeFile('./server/data/data.json', JSON.stringify(req.body));
  res.send('file changed');
});

app.get('/server/data/data.json', (req, res) => {
  file.serve(req, res);
});

app.get('/server/data/users.json', (req, res) => {
  file.serve(req, res);
});
