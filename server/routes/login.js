const { Router } = require('express');
const controller = require('../controller/auth.js');

router = Router()

router.post('/@me/login', controller.loginDirect);
router.post('/@me', controller.createUserDirect);

module.exports = router
