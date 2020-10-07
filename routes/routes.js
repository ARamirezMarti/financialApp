const express = require('express');
const { userController } = require('../controller/user.controller');
const { appController } = require('../controller/app.controller');

const router = express.Router();

router.post('/login', userController.login);
router.post('/signup', userController.signup);

router.get('/app', appController.app);
router.get('/app/getdata', appController.getdata);
module.exports = router;
