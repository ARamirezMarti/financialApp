/* eslint-disable no-console */
// Imports
const express = require('express');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

module.exports = {
  io,
};

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SQL = require('./db/db.service');

// Middles
app.use(cookieParser());
app.use(cors({
  origin: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Authorization, X-API-KEY, application/json ,Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method', 'text/plain'],
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(`${__dirname}/public`)));
// eslint-disable-next-line import/no-dynamic-require
app.use(require(path.join(__dirname, './routes/routes')));

const sqlInstance = new SQL();

sqlInstance.connect((err) => {
  if (err) {
    console.log("Can't connect to the DB", err);
    return;
  }

  // eslint-disable-next-line no-console
  console.log('SQL Database online');
});

server.listen(3500, () => {
  console.log('server listening on port 3500');
});
