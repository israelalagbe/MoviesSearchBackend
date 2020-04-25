const express = require('express');
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
  try {
    const movies = await Movie.find({})
      .skip(startAt)
      .limit(limit)
      .sort('-_id');
    return res.status(200).json({
      movies
    });
  } catch (error) {
    return next(error);
  }
};

