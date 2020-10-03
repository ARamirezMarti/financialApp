const bcrypt = require('bcrypt');
const SQL = require('../db/db.service');

const sqlInstance = new SQL();

const userController = {

  signup(req, res) {
    const { body } = req;

    // add bcrypt
    bcrypt.hash(body.ACCOUNT_PASS, 12, (err, result) => {
      if (err) {
        throw err;
      }
      // Passing an array of form to insert into user table
      sqlInstance.query('INSERT INTO ACCOUNTS(ACCOUNT_NAME, ACCOUNT_PASS,ACCOUNT_EMAIL) VALUES(?,?,?)', [body.ACCOUNT_NAME, result, body.ACCOUNT_EMAIL], (error) => {
        if (error) {
          // handle duplicate entry
          if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ ok: false, tag: '<span class="alert">Email/Account already exist</span>' });
          }
          if (error) {
            return res.status(400).json({ ok: false, tag: '<span class="alert">Error</span>' });
          }
        }

        // TODO: - Redirection to App.html or send password incorrect
        return res.status(301).json({ ok: true, redirect: '/app' });
      });
    });
  },
  login(req, res) {
    const { body } = req;
    // Check is the request is filled
    if (body.ACCOUNT_EMAIL === '' || body.ACCOUNT_PASS === '') {
      res.status(400).json({ ok: false, tag: '<span class="alert">Email or password Incorrect</span>' });
    }

    // Getting the user info
    sqlInstance.query('SELECT ACCOUNT_PASS FROM ACCOUNTS WHERE ACCOUNT_EMAIL = ?', [body.ACCOUNT_EMAIL], (error, result) => {
      if (error) throw error;

      // In case of not finding user/password
      if (result.length === 0) {
        return res.status(200).json({ ok: false, tag: '<span class="alert">Email/Account doesnt exist</span>' });
      }
      // Compare req pass & db pass with compare bcrypt
      bcrypt.compare(body.ACCOUNT_PASS, result[0].ACCOUNT_PASS, (err, unhashed) => {
        if (err)(console.log(error));

        if (unhashed) {
          //  Redirection to App.html or send password incorrect
          return res.status(301).json({ ok: true, redirect: '/app' });
        }
        return res.status(200).json({ ok: false, tag: '<span class="alert">Email or password Incorrect</span>' });
      });
    });
  },

};
module.exports = {
  userController,
};
