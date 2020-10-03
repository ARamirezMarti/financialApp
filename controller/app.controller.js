const path = require('path');
const fs = require('fs');

const appController = {
// el problema aqui
  app(req, res) {
    console.log("estamos en app");
    fs.readFile(path.resolve(__dirname, '../public/app/app.html'), null, (error, data) => {
      if (error) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
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
