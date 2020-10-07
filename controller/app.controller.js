

const path = require('path');
const fs = require('fs');
const JWT = require('jsonwebtoken');
const { queries } = require('./service/appserver.service');

// Routes
const appController = {
  user: {},
  app(req, res) {
    res.sendFile(path.resolve(__dirname, '../public/app/app.html'));
  },
  async getdata(req, res) {
    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      this.user = {
        email: decoded.ACCOUNT_EMAIL,
      };
    });
    console.log(this.user.email);
    const result = await queries.getOperations(this.user);
    console.log(result);
    res.json({ result });
  },

};

module.exports = {
  appController,
};
