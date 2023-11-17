const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// the /api/posts endpoint



// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA


// GET all posts 
router.get('/', async (req, res) => {
  const postData = await Post.findAll({
    include: [{ model: User }],
  });
  res.status(200).json(postData);
});


// DELETE a post 
router.delete('/:id', async (req, res) => {
  const deletedPost = await Post.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedPost);
});


// ------------------------------------------------------------------


// CREATE a post 
router.post('/create', withAuth, async (req, res) => {

    /* req.body should look like this...
    {
      "title": "first post",
      "date_created": "11-15-2023",
      "content": "this is the content of my first post. here is a second sentence.",
      "user_id": 4
    }
  */

  try {
    const newPostData = await {
      ...req.body,
      user_id: req.session.user_id,
    } 
    
    const newPost = await Post.create(newPostData);


    // send new post as a res
    res.json(newPost);

  } catch (error) {
    res.status(400).json(error);
  }
});




// UPDATE post





// DELETE post






module.exports = router;