var express = require('express');
var router = express.Router();
const User = require('../controllers/UserController');

/* GET users listing. */
router.get('/sendCode', User.sendCode);

router.post('/sendCode', User.sendCode);

router.post('/codePhoneLogin', User.codePhoneLogin);
router.get('/codePhoneLogin', User.codePhoneLogin);
module.exports = router;
