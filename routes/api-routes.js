const router = require('express').Router();
const Workout = require('../models/workout.js');

router.post('/api/workouts', (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get('/api/workouts/range', ({body}, res) => {
  Workout.find({})
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.put('/api/workouts/:id', ({body, params}, res) => {
  Workout.findByIdAndUpdate(
    params.id,
    {$push: {exercises: body}},
    {
      new: true,
      runValidators: true,
    }
  )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
router.get('/api/workouts', (req, res) => {
  Workout.find({})
    .sort({date: -1})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
app.delete('/api/workouts/:id', ({params}, res) => {
  // We just have to specify which todo we want to destroy with "where"
  Workout.remove(params.id, {})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
