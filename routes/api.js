const express = require('express');
const router = express.Router();



const { getMovies } = require('../controllers/MovieController');

router.get('/movies', getMovies);

module.exports = router;
