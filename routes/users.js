const express = require('express');
const router = express.Router();
const passport = require('passport');
const { check, validationResult } = require('express-validator');
const { Users } = require('../model/user');
const Movies = require('../model/movie');


router.get("/", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const users = await Users.find({}, { _id: 0, Username: 1, Favorites: 1 });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.get("/:Username", passport.authenticate('jwt', { session: false }), async (req, res) => {
  try {
    const user = await Users.findOne({ Username: req.params.Username });
    res.json(user);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.post("/", [
  check('Username').isLength({ min: 5 }).isAlphanumeric(),
  check('Password').notEmpty(),
  check('Email').isEmail()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const hashedPassword = Users.hashPassword(req.body.Password);
  try {
    const user = await Users.findOne({ Username: req.body.Username });
    if (user) {
      return res.status(400).send(`${req.body.Username} already exists`);
    }
    
    const newUser = await Users.create({
      Username: req.body.Username,
      Password: hashedPassword,
      Email: req.body.Email,
      Birthday: req.body.Birthday
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
