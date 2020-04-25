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
  const [sortField, sortType] = sortQuery? sortQuery.split('|') : ['_id', 'asc'];

  const search = req.query.search||'';

  const year= Number(req.query.year);

  try {

    const query = Movie.find(
      {
        ...( year?{ year }:{} ),

        ...(
          search ? {
            $or:[
              { title: new RegExp(search) },
              { genres: new RegExp(search) },
              { cast: new RegExp(search) }
            ]
          }:{}
        )
      }
    );

    query.skip(startAt)
      .limit(limit)
      .sort(`${sortType==='desc'?'-':''}${sortField}`);

    const movies = await query;
    const totalMovies = await Movie.count();

    return res.status(200).json({
      movies,
      total: totalMovies
    });

  } catch (error) {
    return next(error);
  }
};

