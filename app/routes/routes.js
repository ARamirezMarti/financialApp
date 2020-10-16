const express = require('express');
const { userController } = require('../controller/user.controller');
const { appController } = require('../controller/app.controller');
const { incomeController } = require('../controller/income.controller');
const { expensesController } = require('../controller/expenses.controller');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/app', appController.app);
router.get('/app/getdata', appController.getdata);

// INCOME ROUTES
router.post('/app/addincome', incomeController.addIncome);
router.get('/app/getincome', incomeController.getIncomes);
router.put('/app/updateincome', incomeController.updateIncome);
router.delete('/app/deleteincome', incomeController.deleteIncome);

// EXPENSES ROUTES
router.post('/app/addexpenses', expensesController.addExpenses);
router.get('/app/getexpenses', expensesController.getExpenses);
router.put('/app/updateexpenses', expensesController.updateExpenses);
router.delete('/app/deleteexpenses', expensesController.deleteExpenses);

module.exports = router;
