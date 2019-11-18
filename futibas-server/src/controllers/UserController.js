const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

module.exports = {
  async postAuth(req, res) {
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
      check('email', 'Please insert a valid email').isEmail(),
      check(
        'password',
        'Please enter a password with 6 or more characters'
      ).isLength({ min: 6 })
    ],
      async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
          // See if user exists
          let user = await User.findOne({ email });

          if (user) {
            return res
              .status(400)
              .json({ errors: [{ msg: 'User already exists' }] });
          }

          user = new User({
            name,
            email,
            password
          });

          const salt = await bcrypt.genSalt(10);

          // Encrypt password
          user.password = await bcrypt.hash(password, salt);

          await user.save();

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
