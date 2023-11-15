const router = require('express').Router();
const sequelize = require('../config/connection');
// const { Project, User } = require('../models');
// const withAuth = require('../utils/auth');

//-------------------------------------------
// test routes
router.get('/test', async (req, res) => {
    res.render('test');
});
  

router.get('/test-alreadyLoggedIn', async (req, res) => {
    res.render('test-alreadyLoggedIn');
});


router.get('/test-loggedIn', async (req, res) => {
    res.render('test-loggedIn');
});
//-------------------------------------------


// landing page when logged in vs. not logged in
router.get('/', async (req, res) => {
    if (req.session.logged_in) {
        res.render('test-dashboard', { 
            logged_in: true 
        });
    } else {
        res.render('test-public-homepage'); 
    }
});



// login route
router.get('/login', async (req, res) => {

    // If the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/test-dashboard');
        return;
    }

    res.render('login'); 
});

  
module.exports = router;
