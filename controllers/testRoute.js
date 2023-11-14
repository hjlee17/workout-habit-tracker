const router = require('express').Router();

// test route
router.get('/', async (req, res) => {
    res.render('test');
});
  
module.exports = router;
