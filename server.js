/* eslint-disable no-console */
const express = require('express');

const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const SQL = require('./app/db/database');


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
app.use(require(path.join(__dirname, './app/routes/routes')));

const sqlInstance = SQL();

sqlInstance.connect((err) => {
  if (err) {
    console.log("Can't connect to the DB", err.code);
    process.abort();
  }

  // eslint-disable-next-line no-console
  console.log('SQL Database online');
});

app.listen(process.env.APP_PORT || 3000, () => {
  console.log(`server listening on port ${process.env.APP_PORT}`);
});
