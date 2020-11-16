const JWT = require('jsonwebtoken');
const { incQueries } = require('./utils/appincome.queries');

const appController = {
  async getdata(req, res) {
    let dec = {};
    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) { throw new Error(err); }
      dec = decoded;
    });

    await incQueries.getOperations(dec)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((error) => { res.json({ error }); });
  },
};

module.exports = {
  appController,

};
