var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var url = "mongodb://localhost:27500/angular_demo";
mongoose.connect(url, {useMongoClient: true});

var schema = new mongoose.Schema({
    user: String
  });

var USERCLASS = mongoose.model('user', schema);

module.exports = USERCLASS;