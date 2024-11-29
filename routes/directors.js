const express = require('express');
const router = express.Router();
const {Movie} = require('../model/movie');

router.get("/:Director", async (req, res) => {
  try {
    const director = await Movie.findOne({ "Director.Name": req.params.Director });
    if (director) {
      res.json(director.Director);
    } else {
      res.send(`${req.params.Director} not found`);
    }
  } catch (err) {
    res.status(500).send("Error: " + err);
  }
});

module.exports = router;
