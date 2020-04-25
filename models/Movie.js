const mongoose = require('mongoose');

const String = mongoose.Schema.Types.String;
const Number = mongoose.Schema.Types.Number;
const MovieSchema = new mongoose.Schema({
  title: String,
  year:  Number,
  cast: [String],
  genres: [String]
}, {
  // timestamps: true
});

module.exports = mongoose.model('movies', MovieSchema);
