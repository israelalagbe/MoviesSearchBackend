const express = require('express');
const router = express.Router();
// const { passportMiddleware } = require('../middlewares/passportMiddleware');
// const { Role } = require('../middlewares/role_middleware');


const { getMovies } = require('../controllers/MovieController');

router.get('/movies', getMovies);
// router.put('/driver/location', Role('driver'), updateLocation);

module.exports = router;
