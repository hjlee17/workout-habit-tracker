const router = require('express').Router();

const testRoute = require('./testRoute');

router.use('/', testRoute);


module.exports = router;
