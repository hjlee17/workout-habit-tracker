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


// CREATE a post 
router.post('/', async (req, res) => {
  const newPost = await Post.create(req.body);
  /* req.body should look like this...
    {
      "title": "first post",
      "date_created": "11-15-2023",
      "content": "this is the content of my first post. here is a second sentence.",
      "user_id": 4
    }
  */
  res.json(newPost);
});


// ------------------------------------------------------------------


// UPDATE post





// DELETE post






module.exports = router;