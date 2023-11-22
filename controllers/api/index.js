const router = require('express').Router();
const userRoutes = require('./userRoutes')
const tileRoutes = require('./tileRoutes')
const trackerRoutes = require('./trackerRoutes')
const commentRoutes = require('./commentRoutes')


router.use('/users', userRoutes)
router.use('/tiles', tileRoutes)
router.use('/trackers', trackerRoutes)
router.use('/comments', commentRoutes)



module.exports = router;
