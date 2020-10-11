const express = require('express');
const { userController } = require('../controller/user.controller');
const { appController } = require('../controller/app.controller');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/app', appController.app);
router.get('/app/getdata', appController.getdata);

// INCOME ROUTES
router.post('/app/addincome', appController.addIncome);
router.get('/app/getincome', appController.getIncomes);
router.put('/app/updateincome', appController.updateIncome);
router.delete('/app/deleteincome', appController.deleteIncome);

// EXPENSES ROUTES
router.post('/app/addexpenses', appController.addExpenses);
router.get('/app/getexpenses', appController.getExpenses);
router.put('/app/updateexpenses', appController.updateExpenses);
router.delete('/app/deleteexpenses', appController.deleteExpenses);

module.exports = router;
