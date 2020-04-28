const express = require('express');
const router = express.Router();



const { getMovieCompletions, getMovies } = require('../controllers/MovieController');

router.get('/movies', getMovies);
router.get('/movies/completions', getMovieCompletions);

module.exports = router;
