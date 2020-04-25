var mongoose = require('mongoose');

var ObjectId = mongoose.Schema.Types.ObjectId
var MovieSchema = new mongoose.Schema({
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
})

module.exports = mongoose.model('movies', MovieSchema);