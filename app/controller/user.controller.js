const bcrypt = require('bcrypt');
const JWT = require('jsonwebtoken');
const SQL = require('../db/database');

const sqlInstance = SQL();

const userController = {

  signup(req, res) {
    const { body } = req;

    // add bcrypt
    bcrypt.hash(body.ACCOUNT_PASS, 1, (err, result) => {
      if (err) {
        throw err;
      }
      const colums = ['ACCOUNT_NAME', 'ACCOUNT_PASS', 'ACCOUNT_EMAIL'];
      const values = [body.ACCOUNT_NAME, result, body.ACCOUNT_EMAIL];
      // Passing an array of form to insert into user table
      sqlInstance.query('INSERT INTO ?? (??) VALUES(?)', ['ACCOUNTS', colums, values], (error, results) => {
        if (error) {
          // handle duplicate entry
          if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ ok: false, tag: 'Email/Account already exist' });
          }
          if (error) {
            return res.status(400).json({ ok: false, tag: 'Error' });
          }
        }
        body.id = results.insertId;

        const token = JWT.sign(body, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });

        return res.status(301).json({ ok: true, token });
      });
    });
  },
  login(req, res) {
    const { body } = req;
    // Check is the request is filled
    if (body.ACCOUNT_EMAIL === '' || body.ACCOUNT_PASS === '') {
      res.status(400).json({ ok: false, tag: 'Email or password Incorrect' });
    }

    // Getting the user info
    sqlInstance.query('SELECT ACCOUNT_PASS,ACCOUNT_ID FROM ACCOUNTS WHERE ACCOUNT_EMAIL = ?', [body.ACCOUNT_EMAIL], (error, result) => {
      if (error) throw error;

      // In case of not finding user/password
      if (result.length === 0) {
        return res.status(200).json({ ok: false, tag: 'Email/Account doesnt exist' });
      }
      // Compare req pass & db pass with compare bcrypt
      bcrypt.compare(body.ACCOUNT_PASS, result[0].ACCOUNT_PASS, (err, unhashed) => {
        if (err)(console.log(error));

        if (unhashed) {
          body.id = result[0].ACCOUNT_ID;
          const token = JWT.sign(body, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES });
          // rescookie Solo para el postman
          res.cookie('token',token)
          // rescookie Solo para el postman
          return res.status(301).json({ ok: true, token });
        }
        return res.status(200).json({ ok: false, tag: 'Email or password Incorrect' });
      });
    });
  },

};
module.exports = {
  userController,
};
