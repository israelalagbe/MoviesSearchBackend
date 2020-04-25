const mongoose = require('mongoose');

const ObjectId = mongoose.Schema.Types.ObjectId;
const MovieSchema = new mongoose.Schema({
  // email: {
  //     type: String,
  //     lowercase: true,
  //     unique: true,
  //     required: true
  // },
  // name:  {
  //     type: String,
  //     unique: true,
  //     required: true
  // },
  // user:{
  //     type:ObjectId,
  //     ref:'User'
  // }
}, {
  // timestamps: true
});

module.exports = mongoose.model('movies', MovieSchema);
