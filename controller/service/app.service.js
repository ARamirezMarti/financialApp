const SQL = require('../../db/db.service');

const sqlInstance = new SQL();

const queries = {
  getOperations(user) {
    sqlInstance.query('SELECT L.OPERATION_TYPE,L.AMOUNT FROM OPERATIONS L  INNER JOIN ACCOUNTS A ON  L.ACCOUNT_ID = A.ACCOUNT_ID  WHERE A.ACCOUNT_EMAIL =? ', [user.email], (error, result) => {
      console.log(user.ACCOUNT_EMAIL);
        if (error) {
        return error.code;
      }
      console.log(result);
      return result;
    });
  },

};

module.exports = {
  queries,
};
