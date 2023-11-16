const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// the /api/posts endpoint


// CREATE new post - currently underdevelopment for testing with INSOMNIA
router.post('/', async (req, res) => {
  const newPost = await Post.create(req.body);
  /* req.body should look like this...
    {
      "title": "first post",
      "date_created": "11-15-2023",
      "content": "this is the content of my first post. here is a second sentence.",
      "category_id": "10",
      "user_id": 4
    }
  */
  res.json(newPost);
});



// UPDATE post





// DELETE post






module.exports = router;