const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Match = require('../../models/Match');

router.get('/', auth, async (req, res) => {
  try {
    const match = await Match.findOne({
      user: req.user.id
    }).populate('user', ['name', 'email']);

    if (!match) {
      return res.status(400).json({ msg: 'There is no match' });
    }
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/all', auth, async (req, res) => {
  try {
    const match = await Match.find().populate('user');

    if (!match) {
      return res.status(400).json({ msg: 'There is no match for this user' });
    }
    res.json(match);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.post(
  '/',
  [
    auth,
    [
      check('match_name', 'Match name is required')
        .not()
        .isEmpty(),
      check('match_type', 'Match type is required')
        .not()
        .isEmpty(),
      check('match_schema', 'Match schema is required')
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
      match_name,
      match_date,
      match_type,
      match_place,
      match_schema
    } = req.body;

    // Build Match object
    const matchFields = {};
    matchFields.user = req.user.id;
    if (match_name) matchFields.match_name = match_name;
    if (match_date) matchFields.match_date = match_date;
    if (match_type) matchFields.match_type = match_type;
    if (match_place) matchFields.match_place = match_place;
    if (match_schema) matchFields.match_schema = match_schema;

    try {
      let match = await Match.findOne({ user: req.user.id });
      if (match) {
        //Update
        match = await Match.findOneAndUpdate(
          { user: req.user.id },
          { $set: matchFields },
          { new: true }
        );
        return res.json(match);
      }

      //Create
      match = new Match(matchFields);
      await match.save();

      res.json(match);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;
