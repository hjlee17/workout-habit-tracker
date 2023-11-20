const router = require('express').Router();
const { Tile, User, Comment, Tracker } = require('../../models');
const { withAuth } = require('../../utils/auth');

// The `/api/trackers` endpoint


// ------------------------------------------------------------------
// FOR TESTING IN INSOMNIA


// GET all trackers 
router.get('/', async (req, res) => {
    const trackerData = await Tracker.findAll({
      include: [{ model: Tile }],
    });
    res.status(200).json(trackerData);
});




// ------------------------------------------------------------------


// CREATE new tracker
router.post('/create', withAuth, async (req, res) => {
  const newTracker = await Tracker.create(req.body);
  /* req.body should look like this...
    {
      "tracker_goal": "",
      "current_tracker_status": "",
      "tile_id": "
    }
  */
  res.json(newTracker);
});


// UPDATE a tracker by its `id` value
router.put('/:id', withAuth, async (req, res) => {
  const updatedTracker = await Tracker.update(
  /* req.body should look like this...
    {
      "new_tracker_status": ""
    }
  */
    {
      current_tracker_status: req.body.new_tracker_status
    },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.json(updatedTracker);
});

  

 

module.exports = router;
