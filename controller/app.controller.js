const path = require('path');
const JWT = require('jsonwebtoken');
const { incQueries } = require('./service/appincome.queries');
const { expqueries } = require('./service/appiexpenses.queries');
// Routes
const appController = {
  user: {},
  app(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/app/app.html'));
  },
  async getdata(req, res) {
    let dec = {};
    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });

    await incQueries.getOperations(dec)
      .then((data) => { res.json({ data }); })
      .catch((error) => { res.json({ error }); });
  },

  // INCOMES
  async addIncome(req, res) {
    const { body } = req;
    let dec = {};

    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });
    console.log(dec); console.log(body);
    await incQueries.addincome(body, dec)
      .then((data) => res.json({ data }))
      .catch((error) => {
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
          res.json({ ok: false, e: 'truncadito' });
        } else {
          res.json({ error });
        }
      });
  },
  async getIncomes(req, res) {
    let dec = {};

    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });
    await incQueries.getincomes(dec)
      .then((data) => res.json({ data }))
      .catch((error) => {
        console.log(error);
      });
  },
  async updateIncome(req, res) {
    const { body } = req;
    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
    });
    await incQueries.updateincome(body)
      .then((data) => res.json({ data }))
      .catch((error) => {
        console.log(error);
      });
  },
  async deleteIncome(req, res) {
    let keep = false;
    const { body } = req;

    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { keep = false; console.log(err); }

      keep = true;
    });
    if (keep) {
      await incQueries.deleteincome(body)
        .then((data) => res.json({ data }))
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.end();
    }
  },
  // EXPENSES
  async addExpenses(req, res) {
    const { body } = req;
    let dec = {};

    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });
    await expqueries.addexpenses(body, dec)
      .then((data) => res.json({ data }))
      .catch((error) => {
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
          res.json({ ok: false, e: 'truncadito' });
        }
        console.log('Error', error.code);
      });
  },
  async getExpenses(req, res) {
    let dec = {};

    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });
    await expqueries.getexpenses(dec)
      .then((data) => res.json({ data }))
      .catch((error) => {
        console.log(error);
      });
  },
  async updateExpenses(req, res) {
    const { body } = req;

    JWT.verify(req.cookies.token, 'secret', (err) => {
      if (err) { console.log(err); }
    });
    await expqueries.updateexpenses(body)
      .then((data) => res.json({ data }))
      .catch((error) => {
        console.log(error);
      });
  },
  async deleteExpenses(req, res) {
    let keep = false;
    const { body } = req;

    JWT.verify(req.cookies.token, 'secret', (err) => {
      if (err) { keep = false; console.log(err); }

      keep = true;
    });
    if (keep) {
      await expqueries.deleteexpenses(body)
        .then((data) => res.json({ data }))
        .catch((error) => {
          console.log(error);
        });
    } else {
      res.end();
    }
  },

};

module.exports = {
  appController,
};
