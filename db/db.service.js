const mysql = require('mysql');

function SQL() {
  this.con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'example',
    database: 'financial',
  });

  // eslint-disable-next-line no-return-assign
  return this.con || (this.con = new this());
}

module.exports = SQL;
