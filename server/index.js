const express = require('express');

const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const port = process.env.PORT || 3000;

const path = require('path');

const DIST_DIR = path.join(__dirname, '../dist');
// const HTML_FILE = path.join(DIST_DIR, 'index.html');
// Pour que Express trouve plus tard son chemin “de base”
// et les fichiers statiques générés par Webpack
app.use(express.static(DIST_DIR));

const mockResponse = {
  foo: 'bar',
  bar: 'foo',
};
app.get('/api', (req, res) => {
  res.send(mockResponse);
});
app.get('/', (req, res) => {
  res.status(200).send('Hello World!');
});

io.on('connection', (socket) => {
  socket.on('action', (msg) => { socket.broadcast.emit('action_response', msg); });
});

http.listen(port, () => {
  console.log(`App listening on port: ${port}`);
});
