const { Router } = require('express');
const controller = require('../controller/controller');

router = Router()

router.post('/make-stats', controller.stats_post)

module.exports = router