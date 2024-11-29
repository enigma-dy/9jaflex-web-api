const express = require('express');
const router = express.Router();
const {Movie} = require('../model/movie');

router.get("/:Genre", async (req, res) => {
  try {
    const genre = await Movie.findOne({ "Genre.Name": req.params.Genre });
    if (genre) {
      res.json(genre.Genre);
    } else {
      res.send(`${req.params.Genre} genre not found`);
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
