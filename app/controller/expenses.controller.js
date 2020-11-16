const JWT = require('jsonwebtoken');
const { expqueries } = require('./utils/appiexpenses.queries');

const expensesController = {
  // EXPENSES
  async addExpenses(req, res) {
    const { body } = req;

    const dec = JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error(err);
      }
      return decoded;
    });
    await expqueries.addexpenses(body, dec)
      .then((data) => res.json({ data }))
      .catch((error) => {
        if (error.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') {
          res.json({ ok: false, e: 'truncadito' });
        }
        throw new Error(error);
      });
  },
  async getExpenses(req, res) {
    const dec = JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error(err);
      }
      return decoded;
    });
    await expqueries.getexpenses(dec)
      .then((data) => res.json({ data }))
      .catch((error) => {
        throw new Error(error);
      });
  },
  async updateExpenses(req, res) {
    const { body } = req;

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err) => {
      if (err) {
        throw new Error(err);
      }
    });
    await expqueries.updateexpenses(body)
      .then((data) => res.json({ data }))
      .catch((error) => {
        throw new Error(error);
      });
  },
  async deleteExpenses(req, res) {
    let keep = false;
    const { id } = req.params;

    keep = JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err) => {
      if (err) {
        keep = false; throw new Error(err);
      }

      return true;
    });
    if (keep) {
      await expqueries.deleteexpenses(id)
        .then((data) => res.json({ data }))
        .catch((error) => {
          throw new Error(error);
        });
    } else {
      res.end();
    }
  },

};

module.exports = {
  expensesController,
};
