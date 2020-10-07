const SQL = require('../../db/db.service');

const sqlInstance = new SQL();

const queries = {
  getOperations(user) {
    return new Promise((resolve, reject) => {
      sqlInstance.query('SELECT L.OPERATION_TYPE,L.AMOUNT,A.ACCOUNT_NAME FROM OPERATIONS L  INNER JOIN ACCOUNTS A ON  L.ACCOUNT_ID = A.ACCOUNT_ID  WHERE A.ACCOUNT_EMAIL =? ', [user.email], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

};

module.exports = {
  queries,
};
