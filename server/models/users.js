var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema ({
    name : String,
    events : [{type : Schema.Types.ObjectId, ref : 'events'}]
});

module.exports = mongoose.model('users', User);
