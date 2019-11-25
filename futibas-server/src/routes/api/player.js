const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Player');
const User = require('../../models/User');

// @route   GET api/player
// @desc    Get current users profile
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const player = await Player.findOne({
      user: req.user.id
    }).populate('user', ['name']);

    if (!player) {
      return res.status(400).json({ msg: 'There is no player for this user' });
    }
    res.json(player);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route   POST api/player
// @desc    Create or update player profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('position', 'Position is required')
        .not()
        .isEmpty(),
      check('status', 'Status is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      age,
      position,
      status,
      skills,
      goals,
      assists,
      matches,
      rating
    } = req.body;

    // Build player object
    const playerFields = {};
    playerFields.user = req.user.id;
    if (name) playerFields.name = name;
    if (age) playerFields.age = age;
    if (position) playerFields.position = position;
    if (status) playerFields.status = status;

    if (skills) {
      playerFields.skills = skills.split(',').map(skill => skill.trim());
    }

    //Build social object
    playerFields.statistics = {};
    if (goals) playerFields.statistics.goals = goals;
    if (assists) playerFields.statistics.assists = assists;
    if (matches) playerFields.statistics.matches = matches;
    if (rating) playerFields.statistics.rating = rating;

    try {
      let player = await Player.findOne({ user: req.user.id });

      if (player) {
        //Update
        player = await Player.findOneAndUpdate(
          { user: req.user.id },
          { $set: playerFields },
          { new: true }
        );
        return res.json(player);
      }

      //Create
      player = new Player(playerFields);
      await player.save();

      res.json(player);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   PUT api/player/education
// @desc    Add profile education
// @access  Private
router.put(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('position', 'Position is required')
        .not()
        .isEmpty(),
      check('status', 'Status is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      age,
      position,
      status,
      skills,
      goals,
      assists,
      matches,
      rating
    } = req.body;

    const newPlayer = {
      name,
      age,
      position,
      status,
      skills,
      goals,
      assists,
      matches,
      rating
    };

    try {
      const player = await Player.findOne({ user: req.user.id });

      player.unshift(newPlayer);
      await player.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/player
// @desc    Get all players
// @access  Public
router.get('/', async (req, res) => {
  try {
    const players = await Player.find().populate('user', ['name']);
    res.json(players);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/player/user/:user_id
// @desc    Get player by user ID
// @access  Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const player = await Player.findOne({
      user: req.params.user_id
    }).populate('user', ['name']);

    if (!player) {
      return res.status(400).json({ msg: 'Player not found' });
    }

    res.json(player);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId')
      return res.status(400).json({ msg: 'Player not found' });
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/player
// @desc    Delete players, user
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove Player
    await Player.findOneAndRemove({ user: req.user.id });
    // Remove User
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
