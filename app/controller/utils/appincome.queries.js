const SQL = require('../../db/database');

const sqlInstance = new SQL();

const incQueries = {
  getOperations(decoded) {
    return new Promise((resolve, reject) => {
      const userId = decoded.id;

      const sqlString = 'SELECT B.BALANCE_ID, B.TOTAL_INCOME,B.TOTAL_EXPENSES,B.TOTAL_AMOUNT,A.ACCOUNT_ID,A.ACCOUNT_NAME FROM BALANCE B INNER JOIN ACCOUNTS A ON B.ACCOUNT_ID=A.ACCOUNT_ID   WHERE B.ACCOUNT_ID = ? and BALANCE_ID =(SELECT MAX(BALANCE_ID) FROM BALANCE WHERE ACCOUNT_ID = ?)';
      sqlInstance.query(sqlString, [userId,userId], (error, result) => {
        if (error) {
          reject(error);
        }
        resolve(result);
      });
    });
  },

  addincome(data, decoded) {
    return new Promise((resolve, reject) => {
      const userId = decoded.id;
      const colums = ['ACCOUNT_ID', 'CATEGORY', 'EXPECTED_AMOUNT', 'AMOUNT'];
      const values = [userId, data.CATEGORY, data.EXPECTED_AMOUNT, data.AMOUNT];

      sqlInstance.query('INSERT INTO ?? (??) VALUES(?)', ['INCOME', colums, values], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  getincomes(decoded) {
    return new Promise((resolve, reject) => {
      const userId = decoded.id;
      sqlInstance.query('SELECT * FROM ?? WHERE ACCOUNT_ID = ?', ['INCOME', userId], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
  updateincome(data) {
    return new Promise((resolve, reject) => {
      const ID = data.INCOME_ID;
      const sqlString = 'UPDATE ?? SET INCOME_ID= ?,ACCOUNT_ID = ?,CATEGORY =?,EXPECTED_AMOUNT=?,AMOUNT=? WHERE INCOME_ID =?';
      const values = ['INCOME', data.INCOME_ID, data.ACCOUNT_ID, data.CATEGORY, data.EXPECTED_AMOUNT, data.AMOUNT, ID];

      sqlInstance.query(sqlString, values, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
  deleteincome(id) {
    return new Promise((resolve, reject) => {
      sqlInstance.query('DELETE FROM ?? WHERE INCOME_ID = ? ORDER BY DATE_IN LIMIT 1;', ['INCOME', id], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

};

module.exports = {
  incQueries,
};
