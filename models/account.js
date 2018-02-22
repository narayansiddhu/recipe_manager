var mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');


var Schema = mongoose.Schema;


var Account = new Schema({
    username: String,
    password: String
});

Account.plugin(passportLocalMongoose);

var Account = module.exports = mongoose.model('Account', Account);