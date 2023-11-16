const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post } = require('../models');
const withAuth = require('../utils/auth');

//-------------------------------------------
// test routes
router.get('/test', async (req, res) => {

    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
          attributes: { exclude: ['password'] },
          include: [{ model: Post }],
        });
    
        const user = userData.get({ plain: true });
    
        res.render('dashboard', {
          ...user,
          logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }

});
  

// GET all posts (by all users) to render to homepage
router.get('/', async (req, res) => {
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

        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


router.get('/dashboard', withAuth, async (req, res) => {
    try {
        // Find the logged in user based on the session ID
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: Post }],
        });
        console.log(`userData: ${userData}`)

        const user = userData.get({ plain: true });
        console.log('user:', user)
    
        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in
        });
    } catch (err) {
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
