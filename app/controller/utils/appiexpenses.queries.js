const SQL = require('../../db/database');

const sqlInstance = SQL();

const expqueries = {
   addexpenses (data, decoded) {

    return new Promise((resolve, reject) => {
      const userId = decoded.id;
      const colums = ['ACCOUNT_ID', 'CATEGORY', 'EXPECTED_AMOUNT', 'AMOUNT'];
      const values = [userId, data.CATEGORY, data.EXPECTED_AMOUNT, data.AMOUNT];

       sqlInstance.query('INSERT INTO ?? (??) VALUES(?)', ['EXPENSES', colums, values], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  getexpenses(decoded) {
    return new Promise((resolve, reject) => {
      const userId = decoded.id;
      sqlInstance.query('SELECT * FROM ?? WHERE ACCOUNT_ID = ?', ['EXPENSES', userId], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

  // TODO: REVISAR UPDATE
  updateexpenses(data) {
    return new Promise((resolve, reject) => {
      const ID = data.EXPENSES_ID;
      const sqlString = 'UPDATE ?? SET EXPENSES_ID= ?,ACCOUNT_ID = ?,CATEGORY =?,EXPECTED_AMOUNT=?,AMOUNT=? WHERE EXPENSES_ID =?';
      const values = ['EXPENSES', data.EXPENSES_ID, data.ACCOUNT_ID, data.CATEGORY, data.EXPECTED_AMOUNT, data.AMOUNT, ID];

      sqlInstance.query(sqlString, values, (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },
  deleteexpenses(id) {
    return new Promise((resolve, reject) => {
      
      sqlInstance.query('DELETE FROM ?? WHERE EXPENSES_ID = ? ORDER BY DATE_IN LIMIT 1;', ['EXPENSES', id], (error, result) => {
        if (error) reject(error);
        resolve(result);
      });
    });
  },

};

module.exports = {
  expqueries,
};
