const express = require('express');
const router = express.Router();
const { sequelize } = require('../config/sequelize');
const { User } = require('../models/user');
/* GET users listing. */
router.get('/', async (req, res, next) => {
  // const user = await User.findOne({
  //   where: { id: req.user.id }
  // });
  // console.log(req.user.dataValues)
  res.json(req.user);
  // User.findOne({id:1}).then(users => {
  //   console.log("All users:", JSON.stringify(users, null, 4));
  //   res.json(users);
  // });

});

module.exports = router;
