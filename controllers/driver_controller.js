const express = require('express');
const { Driver } = require('../models/driver');
const { sequelize } = require('../config/sequelize');
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.getAvailableDrivers = async (req, res, next) => {
  try {
    const riderLat = req.query.rider_lat;
    const riderLong = req.query.rider_long;
    const radius = (req.query.radius);
    if (!radius) {
      return res.status(400).json({ error: '`radius` is required' });
    }
    if (!riderLong) {
      return res.status(400).json({ error: '`riderLong` is required' });
    }
    if (!riderLat) {
      return res.status(400).json({ error: '`riderLat` is required' });
    }
    const drivers = await sequelize.query(
      'SELECT users.id as user_id, users.display_name, users.device_token, location_lat, location_long, drivers.updated_at as last_seen, '
      + '( 6371 * acos( cos( radians(:rider_lat) ) * cos( radians( location_lat ) ) * cos( radians( location_long ) - radians(:rider_long)) + sin( radians(:rider_lat) ) * sin( radians( location_lat ) ) ) ) AS distance'
      + ' FROM `drivers`'
      +' INNER JOIN users ON drivers.user_id = users.id '
      + 'WHERE visibility = "visible"'
      + ' HAVING distance <= :distance'
      , {
        type: sequelize.QueryTypes.SELECT,
        replacements: { rider_lat: riderLat,rider_long: riderLong, distance: radius },
      });
    return res.status(200).json({
      'drivers': drivers
    });
  } catch (error) {
    return next(error);
  }
};
/**
 * @param {Request} req
 * @param {Response} res
 * @param {Function} next
 */
exports.updateLocation = async (req, res, next) => {
  try {
    const { lat, long } = req.body || {};
    if (!lat) {
      return res.status(400).json({ error: '`lat` is required' });
    }
    if (!long) {
      return res.status(400).json({ error: '`long` is required' });
    }
    const driver = await Driver.findOne({
      where: { user_id: req.user.id }
    });
    if (driver.visibility==='offline') {
      return res.status(400).json({ error: 'Driver\'s visibility is currently offline, can not update location' });
    }
    if (!driver) {
      return res.status(400).json({ error: 'Driver cannot be found' });
    }
    driver.location_lat = lat;
    driver.location_long = long;
    driver.updated_at = new Date().toLocaleString('en-US', {timeZone: 'Africa/Lagos'})
    await driver.save();
    return res.status(200).json({
      'message': 'Updated Successfully'
    });
  } catch (error) {
    return next(error);
  }
};
