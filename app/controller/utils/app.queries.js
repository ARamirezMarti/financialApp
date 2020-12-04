const SQL = require('../../db/database');

const sqlInstance = SQL();
//TODO: ESTO HA CAMBIADO
const appQueries = {

  getAllData(decoded) {
    return new Promise((resolve, reject) => {
      const userId = decoded.id;

      const sqlString = 'SELECT B.BALANCE_ID, B.TOTAL_INCOME,B.TOTAL_EXPENSES,B.TOTAL_AMOUNT,A.ACCOUNT_ID,A.ACCOUNT_NAME FROM BALANCE B INNER JOIN ACCOUNTS A ON B.ACCOUNT_ID=A.ACCOUNT_ID   WHERE B.ACCOUNT_ID = ? and BALANCE_ID =(SELECT MAX(BALANCE_ID) FROM BALANCE WHERE ACCOUNT_ID = ?)';
      sqlInstance.query(sqlString, [userId, userId], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },
};

module.exports = {
  appQueries,
};
