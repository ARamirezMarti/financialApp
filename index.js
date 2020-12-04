/* eslint-disable no-console */
const express = require('express');

const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
 const cors = require('cors');
const cookieParser = require('cookie-parser');
const SQL = require('./app/db/database');

 app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'PUT','OPTIONS', 'PUT', 'PATCH', 'POST', 'DELETE'],
  allowedHeaders: ['Access-Control-Allow-Headers', 'X-Requested-With,content-type'],
  credentials: true,
})); 



app.use(bodyParser.json());
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

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
  console.log(`Server listening on port ${process.env.APP_PORT}`);
});
