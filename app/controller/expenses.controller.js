const JWT = require('jsonwebtoken');
const { expqueries } = require('./utils/appiexpenses.queries');

const expensesController = {
  // EXPENSES
  async addExpenses(req, res) {
    const { body } = req;
    let dec = {};

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
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

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
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

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err) => {
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
    const { id } = req.params;

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err) => {
      if (err) { keep = false; console.log(err); }

      keep = true;
    });
    if (keep) {
      await expqueries.deleteexpenses(id)
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
  expensesController,
};
