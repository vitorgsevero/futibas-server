const Player = require('../models/Player');
const User = require('../models/User');
const auth = require('../middlewares/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

module.exports = {
  async getAll(req, res, next) {
    try {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error!');
    }
  },
  async postAuth(req, res) {
    [
      check('email', 'Please insert a valid email').isEmail(),
      check('password', 'Password is required').exists()
    ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
          // See if user exists
          let user = await User.findOne({ email });

          if (!user) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Invalid Credentials' }] });
          }

          // Verifying if the password match with bcrypt
          const isMatch = await bcrypt.compare(password, user.password);

          if (!isMatch) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'Invalid Credentials' }] });
          }

          // Return JWT
          const payload = {
            user: {
              id: user.id
            }
          };

          jwt.sign(
            payload,
            config.get('jwtSecret'),
            {
              expiresIn: 360000
            },
            (err, token) => {
              if (err) throw err;
              res.json({ token });
            }
          );
        } catch (error) {
          console.error(err.message);
          res.status(500).send('Server error');
        }
      };
  }
};
