const path = require('path');
const JWT = require('jsonwebtoken');
const { incQueries } = require('./utils/appincome.queries');
// Routes
const appController = {
  user: {},
  app(req, res) {
    res.sendFile(path.resolve(__dirname, '../../public/app.html'));
  },
  async getdata(req, res) {
    let dec = {};
    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) { console.log(err); }
      dec = decoded;
    });

    await incQueries.getOperations(dec)
      .then((data) => { res.json({ data }); })
      .catch((error) => { res.json({ error }); });
  },
};

module.exports = {
  appController,

};
