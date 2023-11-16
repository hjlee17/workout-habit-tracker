const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');
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


// GET all posts - in development - testing for handlebars
router.get('/posts', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                  model: User,
                  attributes: ['first_name'],
                },
            ],
        });

        const posts = postData.map((post) => post.get({ plain: true }));

        res.render('post', {
            posts,
            // logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(500).json(err);
    }
});


// GET one post 
router.get('/posts/:id', async (req, res) => {
    try{ 
        const postData = await Post.findByPk(req.params.id);
        if(!postData) {
            res.status(404).json({message: 'No post exists with this id!'});
            return;
        }
        const post = postData.get({ plain: true });
        res.render('single-post', post);
      } catch (err) {
          res.status(500).json(err);
      };     
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

    // if the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login'); 
});

  
module.exports = router;
