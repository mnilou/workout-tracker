const router = require('express').Router();
const express = require('express');
const Workout = require('../models/workout.js');

// Add users new workout--do we need body in the object on line 23?
router.post('/api/workouts', (req, res) => {
  Workout.create({})
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// Gets up to 7 previous workouts and sorting by descending order
router.get('/api/workouts/range', (req, res) => {
  Workout.find({})
    .sort({_id: -1})
    .limit(7)
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
// Updating workout exercises by id
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
// Get all workouts in descending order
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
// delete a workout by id
router.delete('/api/workouts/:id', ({body, params}, res) => {
  // We just have to specify which todo we want to destroy with "where"
  Workout.delete(body.id)
    .then(() => {
      res.json(true);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
