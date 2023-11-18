const router = require('express').Router();
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

//-------------------------------------------
// test routes
// router.get('/test', async (req, res) => {

router.get('/test', async (req, res) => {
    res.render('single-post');
})

//-------------------------------------------
  

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
        console.log('posts:', posts)

      
        res.render('homepage', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


// GET all posts (by logged in user) to render to dashboard
router.get('/dashboard', withAuth, async (req, res) => {
    console.log('req:', req.session.user_id)
    try {
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            },
            include: [
                {
                  model: User,
                  attributes: ['first_name'],
                },
            ],
            // render posts in reverse chronological order
            order: [['date_created', 'DESC']],
        });

        const posts = postData.map((post) => post.get({ plain: true }));
        console.log('posts:', posts)

      
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in
        });

    } catch (error) {
        res.status(500).json(error);
    }
});


// GET one post to render to single-posts layout
router.get('/posts/:id', withAuth, async (req, res) => {
    console.log('req:', req.session.user_id)
    console.log('flag:', req.session.logged_in)
    console.log('post_id:', req.params.id)
    try{ 
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['first_name'],
                },
                {
                    model: Comment,
                    include: { 
                        model: User,
                        attributes: ['first_name']
                    },
                    attributes: ['date_created', 'content', 'user_id'],
                },
            ],
            // render posts in reverse chronological order
            order: [['date_created', 'DESC']],
        });

        if(!postData) {
            res.status(404).json({message: 'No post exists with this id!'});
            return;
        }

        const post = postData.get({ plain: true });
        console.log('post:', post)

        res.render('single-post', { 
            post, 
            logged_in: req.session.logged_in
        });

    } catch (error) {
          res.status(500).json(error);
          console.log(error);
    };     
});



// login route
router.get('/login', async (req, res) => {

    // if the user is already logged in, redirect the request to another route
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login'); 
});

  
module.exports = router;
