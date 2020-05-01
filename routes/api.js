const express = require('express');
const router = express.Router();



const { getMovieCompletions, getMovies, addCommentToMovie } = require('../controllers/MovieController');

router.get('/movies', getMovies);
router.get('/movies/completions', getMovieCompletions);
router.post('/movies/:id/comments', addCommentToMovie);

module.exports = router;
