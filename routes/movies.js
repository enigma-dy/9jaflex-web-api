const express = require('express');
const router = express.Router();
const { Movie } = require("../model/movie")


router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

router.get("/:Title", async (req, res) => {
  try {
    const movie = await Movie.findOne({ _id: req.params.Title });
    if (movie) {
      res.status(200).json(movie);
    } else {
      res.status(404).send("Movie not found");
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
