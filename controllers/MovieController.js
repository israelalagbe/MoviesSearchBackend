const Movie = require('../models/Movie');

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.getMovies = async (req, res, next) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const startAt = (page * limit) - limit;

  // ?sort=year|asc or ?sort=year|desc
  const sortQuery = req.query.sort;
  const [sortField, sortType] = sortQuery ? sortQuery.split('|') : ['_id', 'asc'];

  const search = req.query.search || '';

  const year = Number(req.query.year);

  try {

    const query = getMovieQuery(year, search);

    const movies = await query.skip(startAt)
      .limit(limit)
      .sort(`${sortType==='desc'?'-':''}${sortField}`);

    const totalMovies = await getMovieQuery(year, search).countDocuments();

    setTimeout(() => {
      res.status(200).json({
        movies,
        total: totalMovies
      });
    }, 0);


  } catch (error) {
    return next(error);
  }
};

/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.getMovieCompletions = async (req, res, next) => {
  const limit = 20;
  const search = req.query.search || '';
  try {


    const movies = (await Movie.find(
      (search ? {
        title: new RegExp(search, 'i')
      } : {}), ['title', '_id']
    )
      .limit(limit))
      .map(({_id, title})=>({id: _id, name: title}));

    res.status(200).json(movies);


  } catch (error) {
    return next(error);
  }
};

function getMovieQuery(year, search) {
  return Movie.find({
    ...(year ? {
      year
    } : {}),
    ...(search ? {
      $or: [{
        title: new RegExp(search, 'i')
      },
      {
        genres: new RegExp(search, 'i')
      },
      {
        cast: new RegExp(search, 'i')
      }
      ]
    } : {})
  });
}
