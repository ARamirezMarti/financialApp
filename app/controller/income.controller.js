const JWT = require('jsonwebtoken');
const { incQueries } = require('./utils/appincome.queries');

const incomeController = {
  // INCOMES
  async addIncome(req, res) {
    const { body } = req;
    let dec = {};

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });

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

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
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
    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
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

    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
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
};

module.exports = {
  incomeController,
};
