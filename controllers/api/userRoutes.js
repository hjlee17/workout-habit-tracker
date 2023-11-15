const router = require('express').Router();
const { User } = require('../../models');
const { Post } = require('../../models');

// The `/api/users` endpoint


// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA


// GET all users 
router.get('/', async (req, res) => {
  const userData = await User.findAll({
    include: [{ model: Post }],
  });
  res.status(200).json(userData);
});

// DLETE a user 
router.delete('/:id', async (req, res) => {
  const deletedUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(deletedUser);
});
// ------------------------------------------------------------------



router.post('/', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    /* req.body should look like this
      {
        "first_name": "Yoongi", 
        "last_name": "Min", 
        "email": "suga@bts.kr", 
        "github": "AgustD", 
        "password": "holly"
      }
    */

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json(newUser);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});





module.exports = router;