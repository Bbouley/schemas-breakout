var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Event = new Schema({
    location : String,
    name : String,
    cost : Number
});

module.exports = mongoose.model('events', Event);
