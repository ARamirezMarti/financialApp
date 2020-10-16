const mysql = require('mysql');

function SQL() {
  this.dbconnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });

  // eslint-disable-next-line no-return-assign
  return this.dbconnection || (this.dbconnection = new this());
}

module.exports = SQL;
