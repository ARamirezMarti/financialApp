const JWT = require('jsonwebtoken');
const { appQueries } = require('./utils/app.queries');

const appController = {
  async getdata(req, res) {
    let dec = {};
    JWT.verify(req.cookies.token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) { throw new Error(err); }
      dec = decoded;
    });

    await appQueries.getAllData(dec)
      .then((data) => {
        console.log(data);
        res.status(200).json({ data });
      })
      .catch((error) => { res.json({ error }); });
  },
};

module.exports = {
  appController,

};
