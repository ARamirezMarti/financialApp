/* TODO:
  - ¿Token en cada ruta para verificar que sigue siendo el mismo usuario? */

const path = require('path');
const fs = require('fs');
const JWT = require('jsonwebtoken');
const { io } = require('../server');
const { queries } = require('./service/app.service');

// Socket io
io.on('connect', () => {
  console.log('connected from server');
});

// Routes
const appController = {
  user: {},
  app(req, res) {
    JWT.verify(req.cookies.token, 'secret', (err, decoded) => {
      if (err) { console.log(err); }
      this.user = {
        email: decoded.ACCOUNT_EMAIL,
      };
    });
    console.log(this.user.email);
    const result = queries.getOperations(this.user);

    fs.readFile(path.resolve(__dirname, '../public/app/app.html'), null, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write(' File not found!');
      } else {
        res.write(data);
      }
      res.end();
    });
  },

};

module.exports = {
  appController,
};
