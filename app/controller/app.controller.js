
const JWT = require('jsonwebtoken');
const { incQueries } = require('./utils/appincome.queries');
// Routes
const appController = {
  user: {},
  async getdata(req, res) {
    let dec = {};
    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });

    await incQueries.getOperations(dec)

      .then((data) => { res.status(200).json({ data }); })
      .catch((error) => { res.json({ error }); });
  },
};

module.exports = {
  appController,

};
