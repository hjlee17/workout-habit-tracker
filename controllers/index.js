const router = require('express').Router();
const apiRoutes = require('./api');
// const testRoute = require('./testRoute');
const homeRoutes = require('./homeRoutes');


router.use('/api', apiRoutes);
// router.use('/', testRoute);
router.use('/', homeRoutes);


module.exports = router;
